import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Users, Smile, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { createPortal } from 'react-dom';
import { COMMUNITY_ROOM } from '../utils/data';
import { useAuth } from '../context/AuthContext';

/* ── Helpers ─────────────────────────────────────────────── */
function formatBubbleTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
function formatDateSeparator(iso) {
  const d   = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

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

function Avatar({ name, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: avatarGrad(name), display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, color: '#fff',
      flexShrink: 0, userSelect: 'none',
    }}>
      {(name?.[0] ?? '?').toUpperCase()}
    </div>
  );
}

function DateSep({ label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-1">
      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      <span className="rounded-full bg-gray-100 px-3 py-0.5 text-[10px] font-semibold text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

function Bubble({ msg, prevMsg, isOwn }) {
  const sameAuthor = prevMsg && prevMsg.userId === msg.userId;
  const showAvatar = !isOwn && !sameAuthor;
  const showName   = !isOwn && !sameAuthor;

  return (
    <div className={`flex items-end gap-2 px-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${sameAuthor ? 'mt-0.5' : 'mt-3'}`}>
      {!isOwn && (
        <div className="w-8 shrink-0">
          {showAvatar && <Avatar name={msg.userName} size={32} />}
        </div>
      )}

      <div className={`flex max-w-[68%] flex-col gap-0.5 ${isOwn ? 'items-end' : 'items-start'}`}>
        {showName && (
          <span className="ml-1 text-xs font-bold" style={{ color: avatarGrad(msg.userName).slice(22, 29) }}>
            {msg.userName}
          </span>
        )}

        <div
          className={`relative rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
            isOwn
              ? 'rounded-br-sm bg-[#dcf8c6] text-gray-900 dark:bg-[#025c4c] dark:text-gray-100'
              : 'rounded-bl-sm bg-white text-gray-900 dark:bg-[#1f2c34] dark:text-gray-100'
          }`}
          style={isOwn ? undefined : { boxShadow: '0 1px 2px rgba(0,0,0,.08)' }}
        >
          {!sameAuthor && (
            <span className={`absolute top-0 ${isOwn ? 'right-[-5px]' : 'left-[-5px]'} overflow-hidden`}
              style={{ width: 8, height: 13 }}>
              <svg width="8" height="13" viewBox="0 0 8 13">
                {isOwn
                  ? <path d="M1 1 Q8 1 8 8 L8 13 Z" fill="#dcf8c6" className="dark:hidden" />
                  : <path d="M7 1 Q0 1 0 8 L0 13 Z" fill="white" className="dark:hidden" />}
                {isOwn
                  ? <path d="M1 1 Q8 1 8 8 L8 13 Z" fill="#025c4c" className="hidden dark:block" />
                  : <path d="M7 1 Q0 1 0 8 L0 13 Z" fill="#1f2c34" className="hidden dark:block" />}
              </svg>
            </span>
          )}

          <span className="break-words">{msg.text}</span>

          <span className={`ml-3 float-right mt-1 text-[10px] ${
            isOwn ? 'text-[#6a9e7f] dark:text-[#6cbc8e]' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {formatBubbleTime(msg.createdAt ?? msg.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

const POLL_INTERVAL = 4000;

/* ── Main exported component ─────────────────────────────── */
export default function CommunityChats() {
  const { user, token, API } = useAuth();

  const [messages,    setMessages]    = useState([]);
  const [draft,       setDraft]       = useState('');
  const [loading,     setLoading]     = useState(true);
  const [sending,     setSending]     = useState(false);
  const [showEmoji,   setShowEmoji]   = useState(false);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [memberCount, setMemberCount] = useState(COMMUNITY_ROOM.memberCount);

  const bottomRef    = useRef(null);
  const inputRef     = useRef(null);
  const emojiBtnRef  = useRef(null);

  /* ── Fetch messages ───────────────────────────────────── */
  const fetchMessages = useCallback(async (silent = false) => {
    try {
      const res  = await fetch(`${API}/api/chat/community/messages?limit=100`);
      const data = await res.json();
      if (!data.success) return;
      const fetched = data.data ?? [];
      setMessages((prev) => {
        const serverIds = new Set(fetched.map((m) => m._id));
        const localOnly = prev.filter((m) => m._local && !serverIds.has(m._id));
        return [...fetched, ...localOnly];
      });
    } catch {}
    finally { if (!silent) setLoading(false); }
  }, [API]);

  /* ── Fetch community info ─────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${API}/api/chat/community`);
        const data = await res.json();
        if (data.success) setMemberCount(data.data?.memberCount ?? COMMUNITY_ROOM.memberCount);
      } catch {}
    })();
  }, [API]);

  /* ── Initial load + polling ───────────────────────────── */
  useEffect(() => {
    fetchMessages(false);
    const timer = setInterval(() => fetchMessages(true), POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [fetchMessages]);

  /* ── Auto-scroll ──────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ── Close emoji on outside click ────────────────────── */
  useEffect(() => {
    const close = (e) => {
      if (!emojiBtnRef.current?.contains(e.target)) setShowEmoji(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  /* ── Send ─────────────────────────────────────────────── */
  const send = async () => {
    const text = draft.trim();
    if (!text || !user || sending) return;
    setSending(true);
    setDraft('');

    const tempId  = `local-${Date.now()}`;
    setMessages((prev) => [...prev, {
      _id: tempId, _local: true,
      userId: user._id ?? user.id, userName: user.name ?? 'You',
      text, createdAt: new Date().toISOString(),
    }]);

    try {
      const res  = await fetch(`${API}/api/chat/community/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.map((m) => m._id === tempId ? { ...data.data } : m));
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
    }
    setSending(false);
    inputRef.current?.focus();
  };

  const meId = user?._id ?? user?.id ?? '__me__';

  /* ── Build items with date separators ────────────────── */
  const items = [];
  let lastDate = null;
  messages.forEach((msg, i) => {
    const d = new Date(msg.createdAt ?? msg.timestamp).toDateString();
    if (d !== lastDate) {
      items.push({ type: 'sep', id: `sep-${d}`, label: formatDateSeparator(msg.createdAt ?? msg.timestamp) });
      lastDate = d;
    }
    items.push({ type: 'msg', msg, prevMsg: i > 0 ? messages[i - 1] : null });
  });

  const toggleEmoji = (e) => {
    e.stopPropagation();
    if (!showEmoji) {
      const rect = emojiBtnRef.current?.getBoundingClientRect();
      setEmojiAnchor(rect ?? null);
    }
    setShowEmoji((s) => !s);
  };

  const pickerTop  = emojiAnchor ? Math.max(10, emojiAnchor.top - 390) : 200;
  const pickerLeft = emojiAnchor ? Math.min(emojiAnchor.left, window.innerWidth - 340) : 0;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg dark:border-gray-700 flex flex-col"
      style={{ height: 'calc(100vh - 220px)', minHeight: 540 }}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f0f2f5] px-4 py-3 dark:border-gray-700 dark:bg-[#202c33] shrink-0">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-xl shadow-sm"
          style={{ background: COMMUNITY_ROOM.gradient }}
        >
          {COMMUNITY_ROOM.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gray-900 dark:text-white">{COMMUNITY_ROOM.name}</h2>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
            <Users size={10} />
            {memberCount.toLocaleString()} members
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* ── Messages area ───────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto py-3 space-y-0"
        style={{ background: 'var(--chat-bg, #efeae2)' }}
      >
        <style>{`:root { --chat-bg: #efeae2; } .dark { --chat-bg: #0b141a; }`}</style>

        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="size-8 rounded-full border-2 border-turquoise-500 border-t-transparent animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-4">
            <span className="text-5xl">💬</span>
            <p className="font-bold text-gray-500 dark:text-gray-400">No messages yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Be the first to say hello to the community!</p>
          </div>
        ) : (
          items.map((item) =>
            item.type === 'sep'
              ? <DateSep key={item.id} label={item.label} />
              : <Bubble
                  key={item.msg._id}
                  msg={item.msg}
                  prevMsg={item.prevMsg}
                  isOwn={item.msg.userId?.toString() === meId}
                />
          )
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Input bar ───────────────────────────────────── */}
      <div className="border-t border-gray-200 bg-[#f0f2f5] px-4 py-3 dark:border-gray-700 dark:bg-[#202c33] shrink-0">
        {!user && (
          <p className="mb-2 text-center text-xs text-gray-400">
            <span className="font-semibold text-turquoise-600">Log in</span> to send messages
          </p>
        )}

        <div className="flex items-end gap-2">
          {/* Emoji button */}
          {user && (
            <div ref={emojiBtnRef} className="relative shrink-0">
              <button
                type="button"
                onClick={toggleEmoji}
                className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Emoji"
              >
                <Smile size={20} />
              </button>
            </div>
          )}

          {/* Text input */}
          <div className="flex flex-1 items-end gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm dark:bg-[#2a3942]">
            <textarea
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              disabled={!user}
              placeholder={user ? 'Type a message…' : 'Login to chat'}
              className="max-h-28 flex-1 resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            {draft && (
              <button type="button" onClick={() => setDraft('')} className="shrink-0 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Send */}
          <button
            onClick={send}
            disabled={!draft.trim() || !user || sending}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-turquoise-600 text-white shadow transition hover:bg-turquoise-500 active:scale-95 disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* ── Emoji picker portal ──────────────────────────── */}
      {showEmoji && emojiAnchor && createPortal(
        <div
          style={{ position: 'fixed', top: pickerTop, left: pickerLeft, zIndex: 9999 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <EmojiPicker
            onEmojiClick={(d) => { setDraft((p) => p + d.emoji); setShowEmoji(false); inputRef.current?.focus(); }}
            theme="auto"
            lazyLoadEmojis
            height={370}
            width={320}
            searchPlaceholder="Search emoji…"
          />
        </div>,
        document.body
      )}
    </div>
  );
}
