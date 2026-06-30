import { useState, useEffect, useCallback } from 'react';
import { useParty } from './useParty';
import { useAuth } from '../context/AuthContext';

/**
 * useWaitingRoom — Hook for guest waiting room experience.
 * Derived from partyState.waitingUsers for the current user.
 * Returns current guest's status: 'pending' | 'admitted' | 'dismissed' | null
 */
export function useWaitingRoom(code) {
  const { partyState } = useParty(code);
  const { user } = useAuth();
  const [guestStatus, setGuestStatus] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  // Derive guest status from partyState
  useEffect(() => {
    if (!partyState || !user) {
      setGuestStatus(null);
      return;
    }

    const userId = user._id ?? user.id;

    // Check if user is an admitted member
    const isMember = partyState.members?.some((m) => m.userId === userId);
    if (isMember) {
      setGuestStatus('admitted');
      return;
    }

    // Check if user is in waiting room
    const waitingRequest = partyState.waitingUsers?.find((w) => w.userId === userId);
    if (waitingRequest) {
      setGuestStatus(waitingRequest.status); // 'pending' | 'admitted' | 'dismissed'
      return;
    }

    // Otherwise, no status
    setGuestStatus(null);
  }, [partyState, user]);

  // Auto-hide banner after admission
  useEffect(() => {
    if (guestStatus === 'admitted') {
      const timer = setTimeout(() => setShowBanner(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [guestStatus]);

  return {
    guestStatus,
    showBanner,
    setShowBanner,
    isWaiting: guestStatus === 'pending',
    isAdmitted: guestStatus === 'admitted',
    isDismissed: guestStatus === 'dismissed',
  };
}
