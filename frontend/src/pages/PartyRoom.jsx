import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Copy, CheckCheck, Users, Send, Smile, X,
  Film, MessageSquare, UserCheck, UserX,
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { MOVIE_DETAILS, getMovieTitle } from '../utils/movie';
import { useAuth } from '../context/AuthContext';
import { useParty } from '../hooks/useParty';
import { useWaitingRoom } from '../hooks/useWaitingRoom';

/* ── Helpers ─────────────────────────────────────────────── */
const AVATAR_COLORS = [
  ['#0891b2','#0e7490'], ['#7c3aed','#6d28d9'], ['#db2777','#be185d'],
  ['#d97706','#b45309'], ['#059669','#047857'], ['#0f766e','#0d9488'],
  ['#4f46e5','#4338ca'], ['#dc2626','#b91c1c'],
];
function avatarGrad(name = '') {
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  const [a, b] = AVATAR_COLORS[h % AVATAR_COLORS.length];
  return `linear-gradient(135deg,${a},${b})`;
}
function Avatar({ name, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: avatarGrad(name), display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {(name?.[0] ?? '?').toUpperCase()}
    </div>
  );
}
function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/* ── Chat bubble ─────────────────────────────────────────── */
function Bubble({ msg, isOwn }) {
  return (
    <div className={`flex items-end gap-2 mb-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOwn && <Avatar name={msg.userName} size={28} />}
      <div className={`max-w-[75%] rounded-2xl px-3 py-1.5 text-sm shadow-sm ${
        isOwn
          ? 'rounded-br-sm bg-turquoise-600 text-white'
          : 'rounded-bl-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100'
      }`}>
        {!isOwn && <p className="mb-0.5 text-[10px] font-bold text-turquoise-400">{msg.userName}</p>}
        <span className="break-words">{msg.text}</span>
        <span className="ml-2 float-right mt-0.5 text-[9px] opacity-60">{formatTime(msg.createdAt)}</span>
      </div>
    </div>
  );
}

/* ── Google Meet-style join toast ────────────────────────── */
function JoinToast({ request, onAdmit, onDismiss }) {
  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-800 w-80">
      <Avatar name={request.userName} size={42} />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 dark:text-white truncate">{request.userName}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">wants to join the party</p>
      </div>
      <div className="flex flex-col gap-1.5 shrink-0">
        <button onClick={() => onAdmit(request)}
          className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 transition-all">
          <UserCheck size={13} /> Admit
        </button>
        <button onClick={() => onDismiss(request)}
          className="flex items-center gap-1 rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 transition-all">
          <UserX size={13} /> Dismiss
        </button>
      </div>
    </div>
  );
}

/* ── Admit/dismiss status banner for guest ───────────────── */
function StatusBanner({ status, onClose }) {
  useEffect(() => {
    if (status === 'admitted') { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }
  }, [status, onClose]);

  if (status === 'pending') return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-gray-800/90 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-sm w-72">
      <div className="size-4 rounded-full border-2 border-turquoise-400 border-t-transparent animate-spin shrink-0" />
      Waiting for host to admit you…
    </div>
  );
  if (status === 'admitted') return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl w-72">
      <UserCheck size={18} /> You've been admitted! Welcome 🎉
      <button onClick={onClose} className="ml-auto text-white/70 hover:text-white"><X size={14} /></button>
    </div>
  );
  if (status === 'dismissed') return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl w-72">
      <UserX size={18} /> Host didn't admit you this time.
      <button onClick={onClose} className="ml-auto text-white/70 hover:text-white"><X size={14} /></button>
    </div>
  );
  return null;
}



/* ── Main page ───────────────────────────────────────────── */
export default function PartyRoom() {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const { user, token, API } = useAuth();

  const code    = (searchParams.get('code') ?? '').toUpperCase();
  const movieId = searchParams.get('movie') ?? '';
  const movie   = MOVIE_DETAILS.find((m) => m.id === movieId) ?? null;

  const meId   = user?._id ?? user?.id ?? null;
  const meName = user?.name ?? 'Guest';

  // Use server-backed party state (canonical source of truth)
  const { partyState, joinRoom, admitUser, dismissUser, sendMessage, loading, error } = useParty(code);
  
  // Use guest-specific waiting room state
  const { guestStatus, showBanner, setShowBanner, isAdmitted } = useWaitingRoom(code);

  // Determine role from server state
  const isHost = partyState?.hostId === meId;

  // Local UI state for chat and emoji
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const emojiBtnRef = useRef(null);

  // Join room on mount
  useEffect(() => {
    if (code && meId && !partyState) {
      joinRoom();
    }
  }, [code, meId, partyState, joinRoom]);

  // Listen for incoming chat messages from socket
  useEffect(() => {
    // This would be connected via useParty hook listening to 'newMessage' events
    // For now, chat is local to this component
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  // Close emoji on outside click
  useEffect(() => {
    const close = (e) => { if (!emojiBtnRef.current?.contains(e.target)) setShowEmoji(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(`${window.location.origin}/party/room?code=${code}&movie=${movieId}`);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleAdmit = async (req) => {
    if (!partyState) return;
    await admitUser(req.requestId, req.userId, req.userName);
  };

  const handleDismiss = async (req) => {
    if (!partyState) return;
    await dismissUser(req.requestId, req.userId);
  };

  const handleSendMessage = useCallback(async () => {
    const text = draft.trim();
    if (!text) return;

    // Add to local message list immediately (optimistic update)
    const msg = {
      id: `${meId ?? meName}-${Date.now()}`,
      userId: meId ?? meName,
      userName: meName,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);

    // Send to server
    await sendMessage(text);
    setDraft('');
    inputRef.current?.focus();
  }, [draft, meId, meName, sendMessage]);

  const pickerTop  = emojiAnchor ? Math.max(10, emojiAnchor.top - 390) : 200;
  const pickerLeft = emojiAnchor ? Math.max(8, emojiAnchor.left - 280) : 8;

  // Get pending join requests (host only)
  const pendingRequests = useMemo(
    () => partyState?.waitingUsers?.filter((w) => w.status === 'pending') ?? [],
    [partyState]
  );

  // Get members from party state
  const members = partyState?.members ?? [];

  // Check loading state
  if (loading && !partyState) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-white">
        <div className="size-8 rounded-full border-2 border-turquoise-400 border-t-transparent animate-spin" />
        <p className="text-gray-400">Joining party…</p>
      </div>
    );
  }

  /* ── No movie found ──────────────────────────────────── */
  if (!movie) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-white">
        <Film size={56} className="text-gray-600" />
        <p className="text-xl font-bold">Room not found</p>
        <p className="text-gray-400 font-mono text-sm">{code || '—'}</p>
        <button onClick={() => navigate('/party')} className="btn-primary mt-2">Back to Party</button>
      </div>
    );
  }

  const hasVideo = Boolean(movie.videoUrl?.trim());
  const isEmbed  = hasVideo && /youtube\.com|youtu\.be|drive\.google\.com/.test(movie.videoUrl);

  return (
    <div className="flex h-screen flex-col bg-gray-950 text-white overflow-hidden">

      {/* ── Header ────────────────────────────────────────── */}
      <header className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-gray-900 px-4 py-3">
        <button onClick={() => navigate('/party')}
          className="flex size-9 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={18} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-sm truncate">{getMovieTitle(movie)}</h1>
          <p className="text-[11px] text-gray-400">
            Watch Party {isHost ? <span className="ml-1 rounded bg-turquoise-700/60 px-1.5 py-0.5 text-[10px] font-bold text-turquoise-200">HOST</span> : ''}
          </p>
        </div>

        {/* Room code — click to copy invite link */}
        <button onClick={copyCode}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-mono font-bold hover:bg-white/20 transition-all"
          title="Copy invite link">
          <span className="tracking-widest text-turquoise-300">{code}</span>
          {codeCopied ? <CheckCheck size={13} className="text-emerald-400" /> : <Copy size={13} className="text-gray-400" />}
        </button>

        {/* Members count from server state */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold"
          title={members.map((m) => m.userName).join(', ')}>
          <Users size={14} className="text-turquoise-400" />
          {members.length}
        </div>
      </header>

      {/* ── Main split ────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Movie player */}
        <div className="flex flex-1 flex-col bg-black">
          {hasVideo ? (
            isEmbed ? (
              <iframe src={movie.videoUrl} title={getMovieTitle(movie)}
                allow="autoplay; encrypted-media; fullscreen" allowFullScreen
                className="h-full w-full" />
            ) : (
              <video controls poster={movie.thumbnail} className="h-full w-full object-contain bg-black">
                <source src={movie.videoUrl} type="video/mp4" />
              </video>
            )
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 to-gray-950">
              {movie.thumbnail && (
                <img src={movie.thumbnail} alt="" className="mb-2 max-h-52 rounded-2xl object-cover opacity-30 blur-sm" />
              )}
              <Film size={56} className="text-gray-600" />
              <p className="font-bold text-gray-400">No video available for this title</p>
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        <div className="flex w-72 shrink-0 flex-col border-l border-white/10 bg-gray-900 xl:w-80">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 shrink-0">
            <MessageSquare size={15} className="text-turquoise-400" />
            <span className="font-bold text-sm">Party Chat</span>
          </div>

          {/* Member avatars from server state */}
          {members.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/10 px-4 py-2 shrink-0">
              {members.slice(0, 8).map((m) => (
                <div key={m.userId} title={m.userName} className="shrink-0">
                  <Avatar name={m.userName} size={26} />
                </div>
              ))}
              {members.length > 8 && <span className="text-xs text-gray-500">+{members.length - 8}</span>}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3" style={{ background: '#0d1117' }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                <span className="text-3xl">🎬</span>
                <p className="text-xs text-gray-600">Party chat is quiet…<br />Say hello!</p>
              </div>
            ) : messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} isOwn={msg.userId === (meId ?? meName)} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input — only if admitted or host */}
          {(isHost || isAdmitted) && (
            <div className="shrink-0 border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-gray-800 px-3 py-2">
                <div ref={emojiBtnRef}>
                  <button type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!showEmoji) setEmojiAnchor(emojiBtnRef.current?.getBoundingClientRect() ?? null);
                      setShowEmoji((s) => !s);
                    }}
                    className="text-gray-500 hover:text-turquoise-400 transition-colors">
                    <Smile size={16} />
                  </button>
                </div>
                <input ref={inputRef} type="text" value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } }}
                  placeholder="Say something…"
                  className="flex-1 bg-transparent text-sm text-gray-100 outline-none placeholder:text-gray-600"
                />
                <button onClick={handleSendMessage} disabled={!draft.trim()}
                  className="text-turquoise-500 hover:text-turquoise-400 disabled:opacity-30 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Emoji picker portal ───────────────────────────── */}
      {showEmoji && emojiAnchor && createPortal(
        <div style={{ position: 'fixed', top: pickerTop, left: pickerLeft, zIndex: 9999 }}
          onMouseDown={(e) => e.stopPropagation()}>
          <EmojiPicker
            onEmojiClick={(d) => { setDraft((p) => p + d.emoji); setShowEmoji(false); inputRef.current?.focus(); }}
            theme="dark" lazyLoadEmojis height={360} width={310}
            searchPlaceholder="Search emoji…"
          />
        </div>,
        document.body
      )}

      {/* ── Join request toasts (host) — one per pending request ── */}
      {isHost && pendingRequests.length > 0 && createPortal(
        <div className="pointer-events-none fixed bottom-6 right-6 z-[9998] flex flex-col gap-3">
          {pendingRequests.map((req) => (
            <JoinToast key={req.requestId} request={req} onAdmit={handleAdmit} onDismiss={handleDismiss} />
          ))}
        </div>,
        document.body
      )}

      {/* ── Guest admit/dismiss banner ────────────────────── */}
      {!isHost && showBanner && guestStatus && createPortal(
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9998] -translate-x-1/2">
          <StatusBanner status={guestStatus} onClose={() => setShowBanner(false)} />
        </div>,
        document.body
      )}
    </div>
  );
}
