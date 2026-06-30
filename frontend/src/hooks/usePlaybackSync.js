import { useState, useCallback, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

/**
 * usePlaybackSync — Hook for synchronized video playback (future use).
 * Fetches and syncs PlaybackState from server.
 * Host controls playback, guests sync to host's time.
 * 
 * Returns: { playbackState, seek, play, pause, setRate, loading, error }
 */
export function usePlaybackSync(code) {
  const { socket, isConnected } = useSocket();
  const { user, API } = useAuth();

  const [playbackState, setPlaybackState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listenerRegisteredRef = useRef(false);

  // Register socket listeners once
  useEffect(() => {
    if (!socket || listenerRegisteredRef.current) return;

    socket.on('playbackUpdated', (state) => {
      console.log('[usePlaybackSync] Playback updated:', state);
      setPlaybackState(state);
    });

    socket.on('playbackSync', (state) => {
      console.log('[usePlaybackSync] Playback sync:', state);
      setPlaybackState(state);
    });

    listenerRegisteredRef.current = true;

    return () => {
      // Keep listeners for lifecycle
    };
  }, [socket]);

  // Fetch current playback state
  const fetchPlaybackState = useCallback(async () => {
    if (!code || !API) return;

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/party/${code}/playback`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPlaybackState(data.data);
      }
    } catch (err) {
      console.error('[usePlaybackSync] Error fetching playback state:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [code, API]);

  // Seek to time (host only)
  const seek = useCallback(
    (time) => {
      if (!socket) return;
      socket.emit('playbackSeek', { code, time });
    },
    [socket, code]
  );

  // Play (host only)
  const play = useCallback(() => {
    if (!socket) return;
    socket.emit('playbackPlay', { code });
  }, [socket, code]);

  // Pause (host only)
  const pause = useCallback(() => {
    if (!socket) return;
    socket.emit('playbackPause', { code });
  }, [socket, code]);

  // Set playback rate (host only)
  const setRate = useCallback(
    (rate) => {
      if (!socket) return;
      socket.emit('playbackRate', { code, rate });
    },
    [socket, code]
  );

  return {
    playbackState,
    seek,
    play,
    pause,
    setRate,
    fetchPlaybackState,
    loading,
    error,
  };
}
