import React, { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

/**
 * SocketContext — Centralized socket management
 * Single source of truth for party state from backend.
 * All clients render state received from server, never maintain independent copies.
 */
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { API } = useAuth();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection once on mount
  useEffect(() => {
    if (socketRef.current) return; // Prevent duplicate connections

    // const socketUrl = API?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    const socketUrl =
      import.meta.env.MODE === "production"
        ? window.location.origin
        : "http://localhost:5000";
    const socket = io(`${socketUrl}/party`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error);
    });

    socketRef.current = socket;

    return () => {
      // Cleanup on unmount (but don't disconnect to preserve connection across routes)
    };
  }, [API]);

  const value = {
    socket: socketRef.current,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
}
