import { useState, useCallback, useRef, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

/**
 * useParty — Hook to manage party state from server.
 * Always derives state from server PartyState model.
 * Single source of truth pattern: no local-only state copies.
 * 
 * Returns: { partyState, joinRoom, admitUser, dismissUser, startParty, loading, error }
 */
export function useParty(code) {
  const { socket, isConnected } = useSocket();
  const { user, token, API } = useAuth();
  
  const [partyState, setPartyState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listenerRegisteredRef = useRef(false);

  // Register socket listeners once (React Strict Mode safe)
  useEffect(() => {
    if (!socket || listenerRegisteredRef.current) return;
    
    // Listen for party state updates from server
    socket.on('partyState', (state) => {
      console.log('[useParty] Received partyState:', state);
      setPartyState(state);
    });

    socket.on('partyUpdated', (state) => {
      console.log('[useParty] Party updated:', state);
      setPartyState(state);
    });

    socket.on('partyStarted', (data) => {
      console.log('[useParty] Party started:', data);
      setPartyState((prev) => prev ? { ...prev, started: true, startedAt: data.timestamp } : null);
    });

    socket.on('joinRequest', (request) => {
      console.log('[useParty] New join request:', request);
      setPartyState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          waitingUsers: [
            ...prev.waitingUsers.filter((w) => w.requestId !== request.requestId),
            {
              requestId: request.requestId,
              userId: request.userId,
              userName: request.userName,
              status: 'pending',
              requestedAt: request.timestamp,
            },
          ],
        };
      });
    });

    socket.on('userAdmitted', (data) => {
      console.log('[useParty] User admitted:', data);
      setPartyState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          members: prev.members.some((m) => m.userId === data.userId)
            ? prev.members
            : [...prev.members, { userId: data.userId, userName: data.userName, role: 'guest', joinedAt: data.timestamp }],
          waitingUsers: prev.waitingUsers.filter((w) => w.userId !== data.userId),
        };
      });
    });

    socket.on('userDismissed', (data) => {
      console.log('[useParty] User dismissed:', data);
      setPartyState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          waitingUsers: prev.waitingUsers.filter((w) => w.userId !== data.userId),
        };
      });
    });

    socket.on('newMessage', (msg) => {
      // Messages are handled separately, not in partyState
      // This is just for awareness of socket connection
      console.log('[useParty] New message:', msg);
    });

    listenerRegisteredRef.current = true;

    return () => {
      // Don't remove listeners; keep them for lifecycle of component
    };
  }, [socket]);

  // Join room when code/socket is ready
  const joinRoom = useCallback(async () => {
    if (!code || !socket || !isConnected || !user) {
      setError('Missing required data to join room');
      return;
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      socket.emit(
        'joinRoom',
        {
          code,
          userId: user._id ?? user.id,
          userName: user.name,
          userToken: token,
        },
        (ack) => {
          if (ack?.success) {
            console.log('[useParty] Joined room:', ack.state);
            setPartyState(ack.state);
            resolve(ack);
          } else {
            const errMsg = ack?.error || 'Failed to join room';
            setError(errMsg);
            console.error('[useParty] Join failed:', errMsg);
            resolve(ack);
          }
          setLoading(false);
        }
      );
    });
  }, [code, socket, isConnected, user, token]);

  // Admit user (host only)
  const admitUser = useCallback(
    (requestId, userId, userName) => {
      if (!socket || !code) {
        setError('Socket not ready or code missing');
        return;
      }

      return new Promise((resolve) => {
        socket.emit(
          'admitUser',
          { code, requestId, userId, userName },
          (ack) => {
            if (ack?.success) {
              console.log('[useParty] Admitted user:', userId);
              setPartyState(ack.state);
              resolve(ack);
            } else {
              const errMsg = ack?.error || 'Failed to admit user';
              setError(errMsg);
              resolve(ack);
            }
          }
        );
      });
    },
    [socket, code]
  );

  // Dismiss user (host only)
  const dismissUser = useCallback(
    (requestId, userId) => {
      if (!socket || !code) {
        setError('Socket not ready or code missing');
        return;
      }

      return new Promise((resolve) => {
        socket.emit(
          'dismissUser',
          { code, requestId, userId },
          (ack) => {
            if (ack?.success) {
              console.log('[useParty] Dismissed user:', userId);
              setPartyState(ack.state);
              resolve(ack);
            } else {
              const errMsg = ack?.error || 'Failed to dismiss user';
              setError(errMsg);
              resolve(ack);
            }
          }
        );
      });
    },
    [socket, code]
  );

  // Start party (host only)
  const startParty = useCallback(() => {
    if (!socket || !code) {
      setError('Socket not ready or code missing');
      return;
    }

    return new Promise((resolve) => {
      socket.emit(
        'startParty',
        { code },
        (ack) => {
          if (ack?.success) {
            console.log('[useParty] Party started');
            setPartyState(ack.state);
            resolve(ack);
          } else {
            const errMsg = ack?.error || 'Failed to start party';
            setError(errMsg);
            resolve(ack);
          }
        }
      );
    });
  }, [socket, code]);

  // Send chat message
  const sendMessage = useCallback(
    (text) => {
      if (!socket || !code) {
        setError('Socket not ready or code missing');
        return;
      }

      return new Promise((resolve) => {
        socket.emit(
          'chatMessage',
          { code, text },
          (ack) => {
            if (ack?.success) {
              resolve(ack.message);
            } else {
              setError(ack?.error || 'Failed to send message');
              resolve(null);
            }
          }
        );
      });
    },
    [socket, code]
  );

  // Get party state (e.g., for late joiners)
  const getPartyState = useCallback(() => {
    if (!socket || !code) {
      setError('Socket not ready or code missing');
      return;
    }

    return new Promise((resolve) => {
      socket.emit(
        'getPartyState',
        { code },
        (ack) => {
          if (ack?.success) {
            console.log('[useParty] Fetched party state:', ack.state);
            setPartyState(ack.state);
            resolve(ack.state);
          } else {
            setError(ack?.error || 'Failed to fetch party state');
            resolve(null);
          }
        }
      );
    });
  }, [socket, code]);

  return {
    partyState,
    joinRoom,
    admitUser,
    dismissUser,
    startParty,
    sendMessage,
    getPartyState,
    loading,
    error,
    isConnected,
  };
}
