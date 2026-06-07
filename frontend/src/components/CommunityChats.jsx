import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Users, Search, Hash } from 'lucide-react';
import { CHAT_ROOMS, CHAT_MESSAGES } from '../utils/data';
import { useAuth } from '../context/AuthContext';

/* ── Helpers ─────────────────────────────────────────────── */
function formatBubbleTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDateSeparator(iso) {
  const d    = new Date(iso);
  const now  = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0)  return 'Today';
  if (diff === 1)  return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

function formatListTime(iso) {
  const d   = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0)  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  if (diff === 1)  return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

/* ── Avatar circle ───────────────────────────────────────── */
function Avatar({ name, size = 40, style = {} }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: avatarGrad(name),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: size * 0.38, fontWeight: 700, color: '#fff',
                  flexShrink: 0, userSelect: 'none', ...style }}>
      {(name?.[0] ?? '?').toUpperCase()}
    </div>
  );
}

/* ── Room list item ──────────────────────────────────────── */
function RoomListItem({ room, lastMsg, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
        isActive
          ? 'bg-turquoise-50 dark:bg-turquoise-950/30'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}
    >
      {/* Room icon */}
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-full text-xl shadow-sm"
        style={{ background: room.gradient }}
      >
        {room.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate font-semibold text-gray-900 dark:text-white text-sm">
            {room.name}
          </span>
          {lastMsg && (
            <span className="shrink-0 text-[10px] text-gray-400 dark:text-gray-500">
              {formatListTime(lastMsg.timestamp)}
            </span>
          )}
        </div>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {lastMsg
            ? <><span className="font-semibold">{lastMsg.userName}:</span> {lastMsg.text}</>
            : room.description}
        </p>
      </div>
    </button>
  );
}

/* ── Date separator ──────────────────────────────────────── */
function DateSep({ label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-1">
      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      <span className="rounded-full bg-gray-100 px-3 py-0.5 text-[10px] font-semibold
                       text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

/* ── Message bubble (WhatsApp style) ─────────────────────── */
function Bubble({ msg, prevMsg, isOwn }) {
  const sameAuthor = prevMsg && prevMsg.userId === msg.userId;
  const showAvatar = !isOwn && !sameAuthor;
  const showName   = !isOwn && !sameAuthor;

  return (
    <div className={`flex items-end gap-2 px-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${sameAuthor ? 'mt-0.5' : 'mt-3'}`}>

      {/* Avatar spacer/icon */}
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

        {/* Bubble */}
        <div className={`relative rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
          isOwn
            ? 'rounded-br-sm bg-[#dcf8c6] text-gray-900 dark:bg-[#025c4c] dark:text-gray-100'
            : 'rounded-bl-sm bg-white text-gray-900 dark:bg-[#1f2c34] dark:text-gray-100'
        }`}
          style={isOwn ? undefined : { boxShadow: '0 1px 2px rgba(0,0,0,.08)' }}
        >
          {/* WhatsApp-style tail */}
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

          {msg.text}

          {/* Time */}
          <span className={`ml-3 float-right mt-1 text-[10px] ${
            isOwn ? 'text-[#6a9e7f] dark:text-[#6cbc8e]' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {formatBubbleTime(msg.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Chat panel ──────────────────────────────────────────── */
function ChatPanel({ room, messages: initMsgs, onBack, isMobile }) {
  const { user }  = useAuth();
  const [messages, setMessages] = useState(initMsgs);
  const [draft,    setDraft]    = useState('');
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text || !user) return;
    setMessages((p) => [...p, {
      id:        `local-${Date.now()}`,
      userId:    user.id ?? user._id ?? 'me',
      userName:  user.name ?? 'You',
      text,
      timestamp: new Date().toISOString(),
    }]);
    setDraft('');
    inputRef.current?.focus();
  };

  const meId = user?.id ?? user?._id ?? '__me__';

  // Build display list with date separators inserted
  const items = [];
  let lastDate = null;
  messages.forEach((msg, i) => {
    const d = new Date(msg.timestamp).toDateString();
    if (d !== lastDate) { items.push({ type: 'sep', id: `sep-${d}`, label: formatDateSeparator(msg.timestamp) }); lastDate = d; }
    items.push({ type: 'msg', msg, prevMsg: i > 0 ? messages[i - 1] : null });
  });

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f0f2f5] px-3 py-2.5 dark:border-gray-700 dark:bg-[#202c33]">
        {isMobile && (
          <button onClick={onBack} className="rounded-full p-1 text-gray-600 hover:bg-black/10 dark:text-gray-300">
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full text-lg"
          style={{ background: room.gradient }}>
          {room.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">{room.name}</h2>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Users size={9} /> {room.memberCount.toLocaleString()} members
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px]
                        font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* Messages area — WhatsApp light green / dark teal wallpaper feel */}
      <div className="flex-1 overflow-y-auto py-3 space-y-0"
           style={{ background: 'var(--chat-bg, #efeae2)' }}>
        <style>{`:root { --chat-bg: #efeae2; } .dark { --chat-bg: #0b141a; }`}</style>

        {items.map((item) =>
          item.type === 'sep'
            ? <DateSep key={item.id} label={item.label} />
            : <Bubble key={item.msg.id} msg={item.msg} prevMsg={item.prevMsg}
                      isOwn={item.msg.userId === meId} />
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-200 bg-[#f0f2f5] px-3 py-2 dark:border-gray-700 dark:bg-[#202c33]">
        {!user && (
          <p className="mb-1.5 text-center text-xs text-gray-400">
            <span className="font-semibold text-turquoise-600">Log in</span> to send messages
          </p>
        )}
        <div className="flex items-end gap-2">
          <div className="flex flex-1 items-end gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm
                          dark:bg-[#2a3942]">
            <textarea
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              disabled={!user}
              placeholder={user ? 'Type a message…' : 'Login to chat'}
              className="max-h-28 flex-1 resize-none bg-transparent text-sm text-gray-900 outline-none
                         placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
          </div>
          <button
            onClick={send}
            disabled={!draft.trim() || !user}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-turquoise-600
                       text-white shadow transition hover:bg-turquoise-500 active:scale-95 disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Exported component ──────────────────────────────────── */
export default function CommunityChats() {
  const [activeRoom, setActiveRoom] = useState(CHAT_ROOMS[0].id);
  const [search,     setSearch]     = useState('');

  const filtered = CHAT_ROOMS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const room     = CHAT_ROOMS.find((r) => r.id === activeRoom);
  const messages = CHAT_MESSAGES[activeRoom] ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg dark:border-gray-700"
         style={{ height: 'calc(100vh - 220px)', minHeight: 540, display: 'flex' }}>

      {/* ── Left sidebar — room list ──────────────────────── */}
      <div className="flex w-[280px] shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-[#111b21]">

        {/* Sidebar header */}
        <div className="border-b border-gray-100 bg-[#f0f2f5] px-4 py-3 dark:border-gray-700 dark:bg-[#202c33]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Community Chats</h2>
            <span className="rounded-full bg-turquoise-500 px-2 py-0.5 text-[10px] font-bold text-white">
              {CHAT_ROOMS.length}
            </span>
          </div>
          {/* Search */}
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 dark:bg-[#2a3942]">
            <Search size={13} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rooms…"
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400
                         dark:text-gray-200 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Room list */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((r) => {
            const msgs    = CHAT_MESSAGES[r.id] ?? [];
            const lastMsg = msgs[msgs.length - 1];
            return (
              <RoomListItem
                key={r.id}
                room={r}
                lastMsg={lastMsg}
                isActive={r.id === activeRoom}
                onClick={() => setActiveRoom(r.id)}
              />
            );
          })}
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-xs text-gray-400">No rooms found</p>
          )}
        </div>
      </div>

      {/* ── Right panel — active chat ─────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {room
          ? <ChatPanel key={activeRoom} room={room} messages={messages} onBack={() => {}} isMobile={false} />
          : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center text-gray-400">
                <Hash size={40} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Select a room to start chatting</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
