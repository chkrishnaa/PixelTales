import PartySession from '../models/PartySession.js';
import PartyState from '../models/PartyState.js';

/* ── POST /api/party
   Host creates a party session.  Requires auth.  Idempotent on same code. */
export const createParty = async (req, res, next) => {
  try {
    const { code, movieId } = req.body;
    if (!code || !movieId) {
      return res.status(400).json({ success: false, message: 'code and movieId are required.' });
    }

    const normalCode = code.toUpperCase().trim();
    const hostId = req.user._id?.toString() ?? req.user.id;
    const hostName = req.user.name;

    // Upsert: if the host re-clicks "Start Party", just refresh the session
    let session = await PartySession.findOne({ code: normalCode });
    if (session) {
      // Allow host to reset their own session
      if (session.hostId !== hostId) {
        return res.status(409).json({ success: false, message: 'Room code already in use by another host.' });
      }
      session.requests = [];
      await session.save();
    } else {
      session = await PartySession.create({
        code:     normalCode,
        movieId,
        hostId,
        hostName,
      });
    }

    // Ensure PartyState exists (server source of truth)
    let partyState = await PartyState.findOne({ code: normalCode });
    if (!partyState) {
      partyState = await PartyState.create({
        partyId: session._id,
        code: normalCode,
        hostId,
        hostName,
        movieId,
        members: [{ userId: hostId, userName: hostName, role: 'host', joinedAt: new Date() }],
        waitingUsers: [],
        started: false,
      });
    }

    res.status(201).json({ success: true, data: { session, partyState } });
  } catch (err) { next(err); }
};

/* ── GET /api/party/:code
   Public — anyone can look up a party to get the movieId before joining. */
export const getParty = async (req, res, next) => {
  try {
    const session = await PartySession.findOne({ code: req.params.code.toUpperCase() });
    if (!session) return res.status(404).json({ success: false, message: 'Party room not found.' });

    res.json({
      success: true,
      data: { code: session.code, movieId: session.movieId, hostId: session.hostId, hostName: session.hostName },
    });
  } catch (err) { next(err); }
};

/* ── GET /api/party/:code/state
   Fetch authoritative PartyState (server source of truth).
   Used by clients to hydrate state on room entry. */
export const getPartyState = async (req, res, next) => {
  try {
    const code = req.params.code.toUpperCase().trim();
    const partyState = await PartyState.findOne({ code });
    
    if (!partyState) {
      return res.status(404).json({ success: false, message: 'Party not found.' });
    }

    res.json({
      success: true,
      data: {
        partyId: partyState._id,
        code: partyState.code,
        hostId: partyState.hostId,
        hostName: partyState.hostName,
        movieId: partyState.movieId,
        members: partyState.members,
        waitingUsers: partyState.waitingUsers,
        started: partyState.started,
        startedAt: partyState.startedAt,
        permissions: partyState.permissions,
      },
    });
  } catch (err) { next(err); }
};

/* ── POST /api/party/:code/join
   Guest submits a join request.  Requires auth. */
export const joinParty = async (req, res, next) => {
  try {
    const session = await PartySession.findOne({ code: req.params.code.toUpperCase() });
    if (!session) return res.status(404).json({ success: false, message: 'Party room not found.' });

    const userId   = req.user._id?.toString() ?? req.user.id;
    const userName = req.user.name;

    // Host cannot join their own party — silently succeed
    if (session.hostId === userId) {
      return res.json({ success: true, isHost: true, message: 'You are the host.' });
    }

    // Upsert: only add if not already admitted/pending (avoid duplicate toasts)
    const existing = session.requests.find((r) => r.userId === userId);
    if (existing && existing.status === 'admitted') {
      return res.json({ success: true, status: 'admitted', message: 'Already admitted.' });
    }

    // Replace any prior request with a fresh pending one
    session.requests = session.requests.filter((r) => r.userId !== userId);
    session.requests.push({ userId, userName, status: 'pending', requestedAt: new Date() });
    await session.save();

    res.json({ success: true, message: 'Join request sent to host.' });
  } catch (err) { next(err); }
};

/* ── GET /api/party/:code/requests
   Host polls this to get pending join requests. */
export const getPendingRequests = async (req, res, next) => {
  try {
    const session = await PartySession.findOne({ code: req.params.code.toUpperCase() });
    if (!session) return res.status(404).json({ success: false, message: 'Party room not found.' });

    const hostId = req.user._id?.toString() ?? req.user.id;
    if (session.hostId !== hostId) {
      return res.status(403).json({ success: false, message: 'Only the host can view join requests.' });
    }

    const pending = session.requests.filter((r) => r.status === 'pending');
    res.json({ success: true, data: pending });
  } catch (err) { next(err); }
};

/* ── POST /api/party/:code/respond
   Host admits or dismisses a join request.
   Body: { userId, action: 'admit' | 'dismiss' } */
export const respondToRequest = async (req, res, next) => {
  try {
    const { userId, action } = req.body;
    if (!userId || !['admit', 'dismiss'].includes(action)) {
      return res.status(400).json({ success: false, message: 'userId and action (admit|dismiss) required.' });
    }

    const session = await PartySession.findOne({ code: req.params.code.toUpperCase() });
    if (!session) return res.status(404).json({ success: false, message: 'Party room not found.' });

    const hostId = req.user._id?.toString() ?? req.user.id;
    if (session.hostId !== hostId) {
      return res.status(403).json({ success: false, message: 'Only the host can respond to requests.' });
    }

    const request = session.requests.find((r) => r.userId === userId);
    if (!request) return res.status(404).json({ success: false, message: 'Join request not found.' });

    request.status = action === 'admit' ? 'admitted' : 'dismissed';
    await session.save();

    res.json({ success: true, status: request.status });
  } catch (err) { next(err); }
};

/* ── GET /api/party/:code/my-status
   Guest polls this to check if they've been admitted or dismissed. */
export const getMyStatus = async (req, res, next) => {
  try {
    const session = await PartySession.findOne({ code: req.params.code.toUpperCase() });
    if (!session) return res.status(404).json({ success: false, message: 'Party room not found.' });

    const userId  = req.user._id?.toString() ?? req.user.id;
    const request = session.requests.find((r) => r.userId === userId);

    res.json({
      success: true,
      status:  request?.status ?? 'pending',
      isHost:  session.hostId === userId,
    });
  } catch (err) { next(err); }
};

/* ── GET /api/party/my
   Returns all party sessions the current user hosted. */
export const getMyParties = async (req, res, next) => {
  try {
    const hostId   = req.user._id?.toString() ?? req.user.id;
    const sessions = await PartySession.find({ hostId }).sort({ createdAt: -1 }).lean();

    const data = sessions.map((s) => ({
      code:         s.code,
      movieId:      s.movieId,
      hostName:     s.hostName,
      createdAt:    s.createdAt,
      memberCount:  s.requests.filter((r) => r.status === 'admitted').length + 1, // +1 for host
      members:      [
        { name: s.hostName, role: 'host' },
        ...s.requests.filter((r) => r.status === 'admitted').map((r) => ({ name: r.userName, role: 'guest' })),
      ],
    }));

    res.json({ success: true, data });
  } catch (err) { next(err); }
};
