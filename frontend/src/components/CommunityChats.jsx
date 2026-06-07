import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Users, MessageSquare, Hash } from 'lucide-react';
import { CHAT_ROOMS, CHAT_MESSAGES } from '../utils/data';
import { useAuth } from '../context/AuthContext';

/* ── Time formatter ───────────────────────────────────────── */
function formatTime(iso) {
  const d   = new Date(iso);
  const now = new Date();
  const diffMin = Math.floor((now - d) / 60000);
  if (diffMin < 1)  return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return `${diffH}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ── Avatar initials ──────────────────────────────────────── */
const AVATAR_COLORS = [
  'from-cyan-400 to-blue-600',
  'from-violet-400 to-purple-600',
  'from-rose-400 to-pink-600',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-600',
  'from-turquoise-300 to-turquoise-600',
];
function avatarColor(name) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/* ── Single chat message bubble ──────────────────────────── */
function MessageBubble({ msg, isOwn }) {
  return (
    <div className={`flex gap-2.5 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`shrink-0 size-8 rounded-full bg-linear-to-br ${avatarColor(msg.userName)}
                       flex items-center justify-center text-xs font-bold text-white uppercase select-none`}>
        {msg.userName[0]}
      </div>

      <div className={`flex max-w-[72%] flex-col gap-0.5 ${isOwn ? 'items-end' : 'items-start'}`}>
        {!isOwn && (
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1">
            {msg.userName}
          </span>
        )}
        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isOwn
            ? 'rounded-tr-sm bg-turquoise-600 text-white'
            : 'rounded-tl-sm bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        }`}>
          {msg.text}
        </div>
        <span className="text-[10px] text-gray-400 mx-1">{formatTime(msg.timestamp)}</span>
      </div>
    </div>
  );
}

/* ── Chat room card ───────────────────────────────────────── */
function RoomCard({ room, lastMsg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-gray-100 transition-all
                 hover:shadow-md hover:ring-turquoise-200 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-turquoise-700"
    >
      {/* Gradient header strip */}
      <div className="flex items-center gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm"
          style={{ background: room.gradient }}
        >
          {room.icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-gray-900 dark:text-white group-hover:text-turquoise-700 dark:group-hover:text-turquoise-400 transition-colors">
            {room.name}
          </h3>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {room.description}
          </p>
        </div>
      </div>

      {/* Last message preview */}
      {lastMsg && (
        <p className="mt-3 truncate rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600
                      dark:bg-gray-800 dark:text-gray-400">
          <span className="font-semibold">{lastMsg.userName}:</span> {lastMsg.text}
        </p>
      )}

      {/* Stats */}
      <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-gray-400">
        <span className="flex items-center gap-1"><Users size={12} />{room.memberCount.toLocaleString()}</span>
        <span className="flex items-center gap-1"><MessageSquare size={12} />{room.messageCount.toLocaleString()}</span>
      </div>
    </button>
  );
}

/* ── Full chat panel ──────────────────────────────────────── */
function ChatPanel({ room, onBack }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState(CHAT_MESSAGES[room.id] ?? []);
  const [draft, setDraft]       = useState('');
  const bottomRef               = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id:        `local-${Date.now()}`,
        userId:    user?.id ?? 'guest',
        userName:  user?.name ?? 'Guest',
        avatar:    null,
        text,
        timestamp: new Date().toISOString(),
      },
    ]);
    setDraft('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const currentUserId = user?.id ?? user?._id ?? 'guest';

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[500px] flex-col rounded-2xl border border-gray-100
                    bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <button
          onClick={onBack}
          className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={18} />
        </button>

        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{ background: room.gradient }}
        >
          {room.icon}
        </div>

        <div className="flex-1">
          <h2 className="font-bold text-gray-900 dark:text-white leading-none">{room.name}</h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Users size={10} /> {room.memberCount.toLocaleString()} members
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold
                        text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isOwn={msg.userId === currentUserId}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 dark:border-gray-800">
        {!user && (
          <p className="mb-2 text-center text-xs text-gray-400 dark:text-gray-500">
            <span className="font-semibold text-turquoise-600">Log in</span> to send messages. You can read the chat as a guest.
          </p>
        )}
        <div className={`flex items-end gap-2 ${!user ? 'opacity-60 pointer-events-none' : ''}`}>
          <textarea
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message… (Enter to send)"
            className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition
                       focus:border-turquoise-400 focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100
                       dark:focus:border-turquoise-600 dark:focus:bg-gray-950 max-h-28"
          />
          <button
            onClick={send}
            disabled={!draft.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-turquoise-600
                       text-white transition hover:bg-turquoise-500 active:scale-95 disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main exported component ──────────────────────────────── */
export default function CommunityChats() {
  const [activeRoom, setActiveRoom] = useState(null);

  if (activeRoom) {
    return (
      <ChatPanel
        room={CHAT_ROOMS.find((r) => r.id === activeRoom)}
        onBack={() => setActiveRoom(null)}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Hash size={20} className="text-turquoise-600" />
            Community Chats
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Join a room and chat with fellow cartoon fans
          </p>
        </div>
        <span className="rounded-full bg-turquoise-500 px-3 py-1 text-xs font-bold text-white">
          {CHAT_ROOMS.length} rooms
        </span>
      </div>

      {/* Room grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHAT_ROOMS.map((room) => {
          const msgs    = CHAT_MESSAGES[room.id] ?? [];
          const lastMsg = msgs[msgs.length - 1];
          return (
            <RoomCard
              key={room.id}
              room={room}
              lastMsg={lastMsg}
              onClick={() => setActiveRoom(room.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
