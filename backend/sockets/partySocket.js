import PartyState from '../models/PartyState.js';
import PlaybackState from '../models/PlaybackState.js';
import PartySession from '../models/PartySession.js';

/**
 * Configure party socket namespace handlers.
 * All party state is managed server-side in PartyState model.
 * Clients join a room by code and receive authoritative state updates.
 */
export default function configurePartySocket(io) {
  const party = io.of('/party');

  party.on('connection', (socket) => {
    console.log(`[Socket] User ${socket.id} connected to /party namespace`);

    /**
     * CLIENT → SERVER: joinRoom
     * Guest or host joins a party room.
     * Params: { code, userId, userName, userToken }
     */
    socket.on('joinRoom', async (data, ack) => {
      try {
        const { code, userId, userName } = data;
        if (!code || !userId || !userName) {
          return ack?.({ success: false, error: 'Missing required fields' });
        }

        const normalCode = code.toUpperCase().trim();
        
        // Find or create PartyState
        let partyState = await PartyState.findOne({ code: normalCode });
        if (!partyState) {
          return ack?.({ success: false, error: 'Party not found' });
        }

        // Determine role: host or guest
        const isHost = partyState.hostId === userId;
        const role = isHost ? 'host' : 'guest';

        // Join socket room
        socket.join(`party_${normalCode}`);
        socket.data = { code: normalCode, userId, userName, role };

        // If host, just connect without join request
        if (isHost) {
          // Ensure host is in members
          const hostExists = partyState.members.some((m) => m.userId === userId);
          if (!hostExists) {
            partyState.members.push({
              userId,
              userName,
              role: 'host',
              joinedAt: new Date(),
            });
            await partyState.save();
          }
          
          // Send current state to host
          const state = {
            partyId: partyState._id,
            code: partyState.code,
            hostId: partyState.hostId,
            members: partyState.members,
            waitingUsers: partyState.waitingUsers,
            started: partyState.started,
            permissions: partyState.permissions,
          };

          socket.emit('partyState', state);
          party.to(`party_${normalCode}`).emit('partyUpdated', state);
          
          return ack?.({ success: true, isHost: true, state });
        }

        // Guest: check if already a member (admitted)
        const alreadyMember = partyState.members.some((m) => m.userId === userId);
        if (alreadyMember) {
          const state = {
            partyId: partyState._id,
            code: partyState.code,
            hostId: partyState.hostId,
            members: partyState.members,
            waitingUsers: partyState.waitingUsers,
            started: partyState.started,
            status: 'admitted',
            permissions: partyState.permissions,
          };
          socket.emit('partyState', state);
          party.to(`party_${normalCode}`).emit('partyUpdated', state);
          return ack?.({ success: true, status: 'admitted', state });
        }

        // Guest: check if already waiting
        const waitingRequest = partyState.waitingUsers.find((w) => w.userId === userId);
        if (waitingRequest && waitingRequest.status === 'pending') {
          const state = {
            partyId: partyState._id,
            code: partyState.code,
            hostId: partyState.hostId,
            members: partyState.members,
            waitingUsers: partyState.waitingUsers,
            started: partyState.started,
            status: 'pending',
            permissions: partyState.permissions,
          };
          socket.emit('partyState', state);
          return ack?.({ success: true, status: 'pending', state });
        }

        // Guest: create new join request with unique requestId
        const requestId = `${userId}_${Date.now()}`;
        partyState.waitingUsers.push({
          requestId,
          userId,
          userName,
          requestedAt: new Date(),
          status: 'pending',
        });
        await partyState.save();

        // Notify host of new join request
        const state = {
          partyId: partyState._id,
          code: partyState.code,
          hostId: partyState.hostId,
          members: partyState.members,
          waitingUsers: partyState.waitingUsers,
          started: partyState.started,
          status: 'pending',
          permissions: partyState.permissions,
        };

        socket.emit('partyState', state);
        party.to(`party_${normalCode}`).emit('partyUpdated', state);
        party.to(`party_${normalCode}`).emit('joinRequest', {
          requestId,
          userId,
          userName,
          timestamp: new Date(),
        });

        ack?.({ success: true, status: 'pending', state });
      } catch (err) {
        console.error('[Socket] joinRoom error:', err);
        ack?.({ success: false, error: err.message });
      }
    });

    /**
     * CLIENT → SERVER: admitUser
     * Host admits a guest from the waiting room.
     * Params: { code, requestId, userId, userName }
     */
    socket.on('admitUser', async (data, ack) => {
      try {
        const { code, requestId, userId, userName } = data;
        if (!code || !requestId || !userId) {
          return ack?.({ success: false, error: 'Missing required fields' });
        }

        const normalCode = code.toUpperCase().trim();
        const partyState = await PartyState.findOne({ code: normalCode });
        if (!partyState) {
          return ack?.({ success: false, error: 'Party not found' });
        }

        // Verify host
        if (partyState.hostId !== socket.data.userId) {
          return ack?.({ success: false, error: 'Only host can admit users' });
        }

        // Find and remove waiting request
        const waitingIdx = partyState.waitingUsers.findIndex((w) => w.requestId === requestId);
        if (waitingIdx === -1) {
          return ack?.({ success: false, error: 'Join request not found' });
        }

        const waitingUser = partyState.waitingUsers[waitingIdx];
        partyState.waitingUsers.splice(waitingIdx, 1);

        // Add to members
        if (!partyState.members.some((m) => m.userId === userId)) {
          partyState.members.push({
            userId,
            userName: waitingUser.userName,
            role: 'guest',
            joinedAt: new Date(),
          });
        }

        await partyState.save();

        // Broadcast updated state to all clients
        const updatedState = {
          partyId: partyState._id,
          code: partyState.code,
          hostId: partyState.hostId,
          members: partyState.members,
          waitingUsers: partyState.waitingUsers,
          started: partyState.started,
          permissions: partyState.permissions,
        };

        party.to(`party_${normalCode}`).emit('partyUpdated', updatedState);
        party.to(`party_${normalCode}`).emit('userAdmitted', {
          userId,
          userName: waitingUser.userName,
          timestamp: new Date(),
        });

        ack?.({ success: true, state: updatedState });
      } catch (err) {
        console.error('[Socket] admitUser error:', err);
        ack?.({ success: false, error: err.message });
      }
    });

    /**
     * CLIENT → SERVER: dismissUser
     * Host dismisses a guest from the waiting room.
     * Params: { code, requestId, userId }
     */
    socket.on('dismissUser', async (data, ack) => {
      try {
        const { code, requestId, userId } = data;
        if (!code || !requestId || !userId) {
          return ack?.({ success: false, error: 'Missing required fields' });
        }

        const normalCode = code.toUpperCase().trim();
        const partyState = await PartyState.findOne({ code: normalCode });
        if (!partyState) {
          return ack?.({ success: false, error: 'Party not found' });
        }

        // Verify host
        if (partyState.hostId !== socket.data.userId) {
          return ack?.({ success: false, error: 'Only host can dismiss users' });
        }

        // Find and remove waiting request
        const waitingIdx = partyState.waitingUsers.findIndex((w) => w.requestId === requestId);
        if (waitingIdx === -1) {
          return ack?.({ success: false, error: 'Join request not found' });
        }

        partyState.waitingUsers.splice(waitingIdx, 1);
        await partyState.save();

        // Broadcast updated state
        const updatedState = {
          partyId: partyState._id,
          code: partyState.code,
          hostId: partyState.hostId,
          members: partyState.members,
          waitingUsers: partyState.waitingUsers,
          started: partyState.started,
          permissions: partyState.permissions,
        };

        party.to(`party_${normalCode}`).emit('partyUpdated', updatedState);
        party.to(`party_${normalCode}`).emit('userDismissed', {
          userId,
          timestamp: new Date(),
        });

        ack?.({ success: true, state: updatedState });
      } catch (err) {
        console.error('[Socket] dismissUser error:', err);
        ack?.({ success: false, error: err.message });
      }
    });

    /**
     * CLIENT → SERVER: startParty
     * Host starts the party.
     * Params: { code }
     */
    socket.on('startParty', async (data, ack) => {
      try {
        const { code } = data;
        if (!code) {
          return ack?.({ success: false, error: 'Missing code' });
        }

        const normalCode = code.toUpperCase().trim();
        const partyState = await PartyState.findOne({ code: normalCode });
        if (!partyState) {
          return ack?.({ success: false, error: 'Party not found' });
        }

        // Verify host
        if (partyState.hostId !== socket.data.userId) {
          return ack?.({ success: false, error: 'Only host can start party' });
        }

        partyState.started = true;
        partyState.startedAt = new Date();
        await partyState.save();

        // Initialize PlaybackState
        let playbackState = await PlaybackState.findOne({ code: normalCode });
        if (!playbackState) {
          playbackState = await PlaybackState.create({
            partyId: partyState._id,
            code: normalCode,
            isPlaying: false,
            currentTime: 0,
            playbackRate: 1.0,
            controlledByHostId: partyState.hostId,
          });
        }

        const updatedState = {
          partyId: partyState._id,
          code: partyState.code,
          hostId: partyState.hostId,
          members: partyState.members,
          waitingUsers: partyState.waitingUsers,
          started: partyState.started,
          startedAt: partyState.startedAt,
          permissions: partyState.permissions,
        };

        party.to(`party_${normalCode}`).emit('partyUpdated', updatedState);
        party.to(`party_${normalCode}`).emit('partyStarted', {
          timestamp: new Date(),
        });

        ack?.({ success: true, state: updatedState });
      } catch (err) {
        console.error('[Socket] startParty error:', err);
        ack?.({ success: false, error: err.message });
      }
    });

    /**
     * CLIENT → SERVER: chatMessage
     * Send a chat message to the party.
     * Params: { code, text }
     */
    socket.on('chatMessage', async (data, ack) => {
      try {
        const { code, text } = data;
        if (!code || !text?.trim()) {
          return ack?.({ success: false, error: 'Missing fields' });
        }

        const normalCode = code.toUpperCase().trim();
        const partyState = await PartyState.findOne({ code: normalCode });
        if (!partyState) {
          return ack?.({ success: false, error: 'Party not found' });
        }

        // Verify user is a member
        const isMember = partyState.members.some((m) => m.userId === socket.data.userId);
        if (!isMember && partyState.hostId !== socket.data.userId) {
          return ack?.({ success: false, error: 'Not a member of this party' });
        }

        const msg = {
          id: `${socket.data.userId}_${Date.now()}`,
          userId: socket.data.userId,
          userName: socket.data.userName,
          text: text.trim(),
          createdAt: new Date(),
        };

        party.to(`party_${normalCode}`).emit('newMessage', msg);
        ack?.({ success: true, message: msg });
      } catch (err) {
        console.error('[Socket] chatMessage error:', err);
        ack?.({ success: false, error: err.message });
      }
    });

    /**
     * CLIENT → SERVER: getPartyState
     * Retrieve current party state (e.g., late joiners).
     * Params: { code }
     */
    socket.on('getPartyState', async (data, ack) => {
      try {
        const { code } = data;
        if (!code) {
          return ack?.({ success: false, error: 'Missing code' });
        }

        const normalCode = code.toUpperCase().trim();
        const partyState = await PartyState.findOne({ code: normalCode });
        if (!partyState) {
          return ack?.({ success: false, error: 'Party not found' });
        }

        const state = {
          partyId: partyState._id,
          code: partyState.code,
          hostId: partyState.hostId,
          members: partyState.members,
          waitingUsers: partyState.waitingUsers,
          started: partyState.started,
          startedAt: partyState.startedAt,
          permissions: partyState.permissions,
        };

        ack?.({ success: true, state });
      } catch (err) {
        console.error('[Socket] getPartyState error:', err);
        ack?.({ success: false, error: err.message });
      }
    });

    /**
     * CLIENT → SERVER: disconnect
     * Clean up on disconnect.
     */
    socket.on('disconnect', () => {
      console.log(`[Socket] User ${socket.id} disconnected`);
    });
  });
}
