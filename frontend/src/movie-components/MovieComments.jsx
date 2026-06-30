import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal }        from "react-dom";
import {
  MessageCircle, Send, Heart, ChevronDown, ChevronUp,
  Shield, MoreHorizontal, Pencil, Trash2, X, Check, Users, Loader2, Smile,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { ADMIN_USER } from "../utils/movie";
import { useAuth }    from "../context/AuthContext";
import LoginModal     from "../components/LoginModal";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-violet-500","bg-sky-500","bg-rose-500","bg-amber-500",
  "bg-emerald-500","bg-indigo-500","bg-pink-500","bg-orange-500",
];

function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function countAllComments(comments) {
  return (comments ?? []).reduce(
    (total, c) => total + 1 + countAllComments(c.replies ?? []),
    0
  );
}

function insertReply(comments, targetId, reply) {
  return comments.map((c) => {
    if (c.id === targetId)  return { ...c, replies: [...(c.replies ?? []), reply] };
    if (c.replies?.length)  return { ...c, replies: insertReply(c.replies, targetId, reply) };
    return c;
  });
}

function applyLike(comments, targetId, liked, newCount, currentUser = null) {
  return comments.map((c) => {
    if (c.id === targetId) {
      const myId   = currentUser?._id ?? currentUser?.id ?? '';
      const myName = currentUser?.name ?? 'You';
      const likedBy = liked
        ? [...(c.likedBy ?? []).filter((u) => u.userId !== myId && u.name !== myName),
            { name: myName, userId: myId, isMe: true }]
        : (c.likedBy ?? []).filter((u) => u.userId !== myId && u.name !== myName);
      return { ...c, likedByMe: liked, likes: newCount, likedBy };
    }
    if (c.replies?.length) return { ...c, replies: applyLike(c.replies, targetId, liked, newCount, currentUser) };
    return c;
  });
}

function removeComment(comments, targetId) {
  return comments
    .filter((c) => c.id !== targetId)
    .map((c) => c.replies?.length ? { ...c, replies: removeComment(c.replies, targetId) } : c);
}

function applyEdit(comments, targetId, newText) {
  return comments.map((c) => {
    if (c.id === targetId) return { ...c, text: newText };
    if (c.replies?.length) return { ...c, replies: applyEdit(c.replies, targetId, newText) };
    return c;
  });
}

let nextLocalId = 1000;
const MAX_DEPTH = 2;

// ─── Likers Modal ─────────────────────────────────────────────────────────────

function LikersModal({ likers, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-200 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Heart size={16} className="fill-rose-500 text-rose-500" />
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Liked by</h3>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">{likers.length}</span>
          </div>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-72 space-y-1 overflow-y-auto p-3">
          {likers.length === 0 ? (
            <div className="py-6 text-center">
              <Users size={28} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-400">No likes yet</p>
            </div>
          ) : (
            likers.map((liker, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${liker.isMe ? "bg-turquoise-500" : getAvatarColor(liker.name)}`}>
                  {getInitials(liker.name)}
                </div>
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{liker.name}</p>
                {liker.isMe && (
                  <span className="ml-auto shrink-0 rounded-full bg-turquoise-100 px-2 py-0.5 text-[10px] font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">You</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── @Mention badge ───────────────────────────────────────────────────────────

function MentionBadge({ name, isClassic }) {
  const isAdminUser = name === ADMIN_USER;
  const avatarBg    = isAdminUser
    ? isClassic ? "bg-amber-700" : "bg-turquoise-600"
    : getAvatarColor(name);
  const initials    = isAdminUser ? <Shield size={11} /> : getInitials(name);

  return (
    <span className="group/mention relative mr-0.5 inline-block">
      <span
        className={`cursor-pointer font-semibold hover:underline ${isClassic ? "text-amber-700 dark:text-amber-500" : "text-turquoise-600 dark:text-turquoise-400"}`}
      >
        @{name}
      </span>
      <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-200 group-hover/mention:visible group-hover/mention:pointer-events-auto group-hover/mention:opacity-100">
        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${avatarBg} ${isAdminUser ? `ring-2 ${isClassic ? "ring-amber-500" : "ring-turquoise-400"} ring-offset-1` : ""}`}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                {name}
              </p>
              <p
                className={`mt-0.5 text-[10px] font-semibold ${isClassic ? "text-amber-600 dark:text-amber-400" : "text-turquoise-600 dark:text-turquoise-400"}`}
              >
                {isAdminUser ? "Krishnakumar Chaurashiya" : "PixelTales Member"}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 h-2 w-2 -translate-y-px rotate-45 border-b border-r border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800" />
      </div>
    </span>
  );
}

// ─── Single comment thread (recursive) ───────────────────────────────────────

function CommentThread({
  comment, depth, parentId,
  onReply, onLike, onDelete, onEdit,
  onToggleReplies, openReplies,
  activeReplyId, onSetActiveReply,
  currentUserId, isClassic,
}) {
  const [showMenu,        setShowMenu]        = useState(false);
  const [isEditing,       setIsEditing]       = useState(false);
  const [editText,        setEditText]        = useState(comment.text);
  const [showLikers,      setShowLikers]      = useState(false);
  const [replyText,       setReplyText]       = useState("");
  const [showReplyEmoji,  setShowReplyEmoji]  = useState(false);
  const [replyEmojiAnchor,setReplyEmojiAnchor]= useState(null);
  const replyEmojiBtnRef = useRef(null);
  const replyInputRef    = useRef(null);

  const showReplyInput = activeReplyId === comment.id;
  const isAdmin        = comment.user === ADMIN_USER;
  const isOwnComment   = currentUserId && comment.userId === currentUserId;
  const avatarBg       = isAdmin
    ? isClassic ? "bg-amber-700" : "bg-turquoise-600"
    : getAvatarColor(comment.user);
  const hasReplies     = (comment.replies?.length ?? 0) > 0;
  const isOpen         = openReplies.has(comment.id);
  const v              = isClassic;
  const vFont          = { fontFamily: '"Courier New", Courier, monospace' };

  const enterEdit = () => { setEditText(comment.text); setIsEditing(true); setShowMenu(false); };
  const saveEdit  = () => {
    const text = editText.trim();
    if (!text) return;
    onEdit(comment.id, text);
    setIsEditing(false);
  };

  const submitReply = () => {
    const text = replyText.trim();
    if (!text) return;
    const targetId = depth >= MAX_DEPTH ? parentId : comment.id;
    onReply(targetId, comment.user, {
      id: `local-${nextLocalId++}`, user: "You", isAdmin: false,
      replyTo: comment.user, text, likes: 0, likedByMe: false, likedBy: [],
      timestamp: "Just now", userId: currentUserId, replies: [],
    });
    setReplyText("");
    onSetActiveReply(null);
  };

  return (
    <div>
      <div className={`p-3.5 transition-all duration-200 ${v ? "rounded-sm" : "rounded-2xl"} ${
        isAdmin
          ? v
            ? "border-2 border-amber-600/70 bg-[#fef3c7] dark:bg-amber-900/25 dark:border-amber-600/50 shadow-[2px_2px_0_rgba(180,83,9,0.25)] dark:shadow-[2px_2px_0_rgba(120,53,15,0.4)]"
            : "border border-turquoise-200 bg-turquoise-50/80 dark:border-turquoise-700/50 dark:bg-turquoise-950/30"
          : v
            ? "border border-amber-700/25 bg-[#f5e6c8]/50 dark:bg-[#1a1005]/50 dark:border-amber-800/25 hover:border-amber-700/60 hover:bg-amber-900/10 dark:hover:bg-amber-900/25 dark:hover:border-amber-700/50"
            : "border border-gray-100 bg-gray-50 hover:border-turquoise-200 hover:bg-turquoise-50/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-turquoise-800"
      }`}>
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold text-white shadow-sm ${v ? "rounded-sm" : "rounded-full"} ${avatarBg} ${
            isAdmin ? `ring-2 ${v ? "ring-amber-500" : "ring-turquoise-400"} ring-offset-1 dark:ring-offset-gray-900` : ""
          }`}>
            {isAdmin ? <Shield size={13} /> : getInitials(comment.user)}
          </div>

          <div className="min-w-0 flex-1">
            {/* Header row */}
            <div className="mb-1 flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`text-sm font-bold ${
                  isAdmin
                    ? v ? "text-amber-800 dark:text-amber-300" : "text-turquoise-700 dark:text-turquoise-300"
                    : v ? "text-amber-900 dark:text-amber-100" : "text-gray-900 dark:text-white"
                }`} style={v ? vFont : undefined}>
                  {comment.user}
                </span>
                {isAdmin && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold ${v ? "rounded-sm" : "rounded-full"} ${
                    v
                      ? "bg-amber-600/25 text-amber-900 dark:bg-amber-800/50 dark:text-amber-300 border border-amber-600/40 shadow-sm"
                      : "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/60 dark:text-turquoise-300"
                  }`} style={v ? vFont : undefined}>
                    <Shield size={9} /> {v ? "✦ Admin" : "Admin"}
                  </span>
                )}
                <span className={`text-[11px] ${v ? "text-amber-700/60 dark:text-amber-700" : "text-gray-400 dark:text-gray-500"}`}
                  style={v ? vFont : undefined}>
                  {comment.timestamp}
                </span>
              </div>

              {isOwnComment && (
                <div className="relative ml-1 shrink-0">
                  <button onClick={() => setShowMenu((s) => !s)}
                    className={`flex size-6 items-center justify-center transition ${v ? "rounded-sm" : "rounded-full"} ${
                      v ? "text-amber-700/60 hover:bg-amber-700/10 hover:text-amber-800 dark:text-amber-700 dark:hover:bg-amber-800/20" : "text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700"
                    }`}>
                    <MoreHorizontal size={14} />
                  </button>
                  {showMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                      <div className={`absolute right-0 top-7 z-20 w-36 overflow-hidden border shadow-xl ${v ? "rounded-sm" : "rounded-xl"} ${
                        v
                          ? "border-amber-700/30 bg-[#fdf3d8] dark:border-amber-800/30 dark:bg-[#1e1508]"
                          : "border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800"
                      }`}>
                        <button onClick={enterEdit}
                          className={`flex w-full items-center gap-2 px-3.5 py-2.5 text-sm font-semibold transition ${
                            v ? "text-amber-900 dark:text-amber-200 hover:bg-amber-100/60 hover:text-amber-800 dark:hover:bg-amber-900/30" : "text-gray-700 dark:text-gray-300 hover:bg-turquoise-50 hover:text-turquoise-700 dark:hover:bg-turquoise-950/40"
                          }`} style={v ? vFont : undefined}>
                          <Pencil size={13} /> Edit
                        </button>
                        <button onClick={() => { onDelete(comment.id, comment._dbId); setShowMenu(false); }}
                          className="flex w-full items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                          style={v ? vFont : undefined}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Comment body */}
            {isEditing ? (
              <div className="mt-1">
                <textarea autoFocus value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) saveEdit();
                    if (e.key === "Escape") setIsEditing(false);
                  }}
                  rows={3}
                  className={`w-full resize-none border px-3 py-2 text-sm outline-none ${v ? "rounded-sm" : "rounded-xl"} ${
                    v
                      ? "border-amber-700/40 bg-[#fdf3d8] dark:bg-[#1e1508] text-amber-900 dark:text-amber-200 focus:ring-2 focus:ring-amber-600/40"
                      : "border-turquoise-300 bg-white text-gray-700 focus:ring-2 focus:ring-turquoise-400/50 dark:border-turquoise-700 dark:bg-gray-900 dark:text-gray-300"
                  }`}
                  style={v ? vFont : undefined}
                />
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={saveEdit} disabled={!editText.trim()}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white transition disabled:opacity-40 ${v ? "rounded-sm" : "rounded-lg"} ${v ? "bg-amber-700 hover:bg-amber-600" : "bg-turquoise-600 hover:bg-turquoise-700"}`}
                    style={v ? vFont : undefined}>
                    <Check size={12} /> Save
                  </button>
                  <button onClick={() => setIsEditing(false)}
                    className={`px-3 py-1.5 text-xs font-semibold transition ${v ? "rounded-sm" : "rounded-lg"} ${v ? "text-amber-700/70 hover:bg-amber-100/60 dark:hover:bg-amber-900/20" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    style={v ? vFont : undefined}>
                    Cancel
                  </button>
                  <span className={`text-[11px] ${v ? "text-amber-700/50" : "text-gray-400"}`}
                    style={v ? vFont : undefined}>
                    Ctrl+Enter to save
                  </span>
                </div>
              </div>
            ) : (
              <p className={`text-sm leading-relaxed ${
                isAdmin
                  ? v ? "text-amber-800 dark:text-amber-200" : "text-turquoise-800 dark:text-turquoise-100"
                  : v ? "text-amber-900/80 dark:text-amber-300/80" : "text-gray-700 dark:text-gray-300"
              }`} style={v ? vFont : undefined}>
                {comment.replyTo && <MentionBadge name={comment.replyTo} isClassic={v} />}
                {comment.text}
              </p>
            )}

            {/* Action row */}
            {!isEditing && (
              <div className="mt-2.5 flex flex-wrap items-center gap-4">
                <button onClick={() => onLike(comment.id, comment._dbId)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                    comment.likedByMe
                      ? "text-rose-500 dark:text-rose-400"
                      : v ? "text-amber-700/60 hover:text-rose-500 dark:text-amber-700 dark:hover:text-rose-400" : "text-gray-400 hover:text-rose-500 dark:hover:text-rose-400"
                  }`} style={v ? vFont : undefined}>
                  <Heart size={12} fill={comment.likedByMe ? "currentColor" : "none"} />
                  <span>{comment.likedByMe ? "Liked" : "Like"}</span>
                </button>

                <button onClick={() => onSetActiveReply(showReplyInput ? null : comment.id)}
                  className={`text-xs font-semibold transition-colors ${
                    showReplyInput
                      ? v ? "text-amber-700 dark:text-amber-500" : "text-turquoise-600 dark:text-turquoise-400"
                      : v ? "text-amber-700/60 hover:text-amber-700 dark:text-amber-700 dark:hover:text-amber-500" : "text-gray-400 hover:text-turquoise-600 dark:hover:text-turquoise-400"
                  }`} style={v ? vFont : undefined}>
                  Reply
                </button>

                {hasReplies && (
                  <button onClick={() => onToggleReplies(comment.id)}
                    className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                      v ? "text-amber-700 hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-400" : "text-turquoise-600 hover:text-turquoise-700 dark:text-turquoise-400"
                    }`} style={v ? vFont : undefined}>
                    {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    {isOpen ? "Hide" : "View"} {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                  </button>
                )}

                {comment.likes > 0 && (
                  <div className="group/likecount relative ml-auto">
                    <button onClick={() => setShowLikers(true)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:text-rose-500 dark:hover:text-rose-400 ${v ? "text-amber-700/60 dark:text-amber-700" : "text-gray-400"}`}>
                      <Heart size={11} className={comment.likedByMe ? "fill-rose-400 text-rose-400" : ""} />
                      <span>{comment.likes}</span>
                    </button>
                    <div className="pointer-events-none invisible absolute bottom-full right-0 z-30 mb-1.5 opacity-0 transition-all duration-150 group-hover/likecount:visible group-hover/likecount:opacity-100">
                      <div className="whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow dark:bg-gray-700">
                        View Likes
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reply input */}
        {showReplyInput && (
          <div className="ml-11 mt-3 flex items-center gap-2"
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) onSetActiveReply(null); }}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center text-[10px] font-bold ${v ? "rounded-sm" : "rounded-full"} ${
              v ? "bg-amber-700/20 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : "bg-turquoise-100 text-turquoise-600 dark:bg-turquoise-900/40 dark:text-turquoise-400"
            }`} style={v ? vFont : undefined}>
              You
            </div>
            <div className={`flex flex-1 items-center gap-2 border px-3 py-1.5 ${v ? "rounded-sm" : "rounded-full"} ${
              v
                ? "border-amber-700/35 bg-[#fdf3d8] dark:bg-[#1e1508] focus-within:border-amber-600 dark:border-amber-800/40 dark:focus-within:border-amber-600"
                : "border-gray-200 bg-white focus-within:border-turquoise-400 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-turquoise-600"
            }`}>
              {/* Emoji button for reply */}
              <button
                ref={replyEmojiBtnRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!showReplyEmoji) {
                    const rect = replyEmojiBtnRef.current?.getBoundingClientRect();
                    setReplyEmojiAnchor(rect ?? null);
                  }
                  setShowReplyEmoji((s) => !s);
                }}
                className={`shrink-0 transition ${v ? "text-amber-700/60 hover:text-amber-700" : "text-gray-400 hover:text-turquoise-600"}`}
                title="Emoji"
              >
                <Smile size={13} />
              </button>
              <span className={`shrink-0 text-xs font-semibold ${v ? "text-amber-700 dark:text-amber-500" : "text-turquoise-600 dark:text-turquoise-400"}`}
                style={v ? vFont : undefined}>
                @{comment.user}
              </span>
              <input
                ref={replyInputRef}
                autoFocus
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitReply()}
                placeholder="Write a reply…"
                className={`flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400 ${v ? "text-amber-900 dark:text-amber-300" : "text-gray-700 dark:text-gray-300"}`}
                style={v ? vFont : undefined}
              />
              <button onClick={submitReply} disabled={!replyText.trim()}
                className={`shrink-0 transition disabled:cursor-not-allowed disabled:opacity-30 ${v ? "text-amber-700 hover:text-amber-800 dark:text-amber-500" : "text-turquoise-600 hover:text-turquoise-700 dark:text-turquoise-400"}`}>
                <Send size={13} />
              </button>
            </div>

            {/* Reply emoji picker portal */}
            {showReplyEmoji && replyEmojiAnchor && createPortal(
              <div
                style={{
                  position: 'fixed',
                  top: Math.max(10, replyEmojiAnchor.top - 360),
                  left: Math.min(replyEmojiAnchor.left, (window.innerWidth ?? 1200) - 320),
                  zIndex: 9999,
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <EmojiPicker
                  onEmojiClick={(d) => {
                    setReplyText((p) => p + d.emoji);
                    setShowReplyEmoji(false);
                    replyInputRef.current?.focus();
                  }}
                  theme="auto"
                  lazyLoadEmojis
                  height={340}
                  width={300}
                  searchPlaceholder="Search emoji…"
                />
              </div>,
              document.body
            )}
          </div>
        )}
      </div>

      {showLikers && <LikersModal likers={comment.likedBy ?? []} onClose={() => setShowLikers(false)} />}

      {/* Nested replies */}
      {hasReplies && isOpen && (
        <div className={`ml-7.5 mt-2 border-l-2 ${v ? "border-amber-700/30 dark:border-amber-800/30" : "border-turquoise-200/60 dark:border-turquoise-800/50"}`}>
          {comment.replies.map((reply) => (
            <div key={reply.id} className="relative pl-3 pt-2">
              <div className={`absolute -left-0.5 top-0 h-10 w-3 rounded-bl-[6px] border-b-2 border-l-2 ${v ? "border-amber-700/30 dark:border-amber-800/30" : "border-turquoise-200/60 dark:border-turquoise-800/50"}`} />
              <CommentThread
                comment={reply} depth={depth + 1} parentId={comment.id}
                onReply={onReply} onLike={onLike} onDelete={onDelete} onEdit={onEdit}
                onToggleReplies={onToggleReplies} openReplies={openReplies}
                activeReplyId={activeReplyId} onSetActiveReply={onSetActiveReply}
                currentUserId={currentUserId} isClassic={isClassic}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function MovieComments({ movie }) {
  const { user, token, API } = useAuth();
  const v    = movie.modern === false;
  const vFont = { fontFamily: '"Courier New", Courier, monospace' };

  const [comments,      setComments]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [posting,       setPosting]       = useState(false);
  const [newComment,    setNewComment]    = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [openReplies,   setOpenReplies]   = useState(new Set());
  const [showEmoji,     setShowEmoji]     = useState(false);
  const [emojiAnchor,   setEmojiAnchor]   = useState(null);
  const [showLoginModal,setShowLoginModal]= useState(false);
  const [avatarErr,     setAvatarErr]     = useState(false);
  const commentInputRef = useRef(null);
  const emojiBtnRef     = useRef(null);

  // Close emoji on outside click
  useEffect(() => {
    const close = (e) => {
      if (!emojiBtnRef.current?.contains(e.target)) setShowEmoji(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const currentUserId = user?._id ?? user?.id ?? null;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`${API}/api/movies/${movie.id}/comments`, { headers })
      .then((r) => r.json())
      .then(({ success, data }) => {
        if (!cancelled && success) {
          setComments(data ?? []);
          const ids = new Set();
          (data ?? []).forEach((c) => { if (c.replies?.length) ids.add(c.id); });
          setOpenReplies(ids);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [movie.id, API, token]);

  const handleLike = async (localId, dbId) => {
    if (!user) { setShowLoginModal(true); return; }
    setComments((prev) => {
      const node = findNodeAnywhere(prev, localId);
      if (!node) return prev;
      const liked    = !node.likedByMe;
      const newCount = node.likes + (liked ? 1 : -1);
      return applyLike(prev, localId, liked, newCount, user);
    });
    if (!dbId || dbId.startsWith("local-")) return;
    try {
      const res  = await fetch(`${API}/api/movies/${movie.id}/comments/${dbId}/like`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success)
        setComments((prev) => applyLike(prev, localId, data.data.liked, data.data.likes, user));
    } catch {}
  };

  const handleDelete = async (localId, dbId) => {
    setComments((prev) => removeComment(prev, localId));
    if (!dbId || dbId.startsWith("local-")) return;
    try {
      await fetch(`${API}/api/movies/${movie.id}/comments/${dbId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  };

  const handleEdit = (localId, newText) =>
    setComments((prev) => applyEdit(prev, localId, newText));

  const handleReply = async (parentLocalId, parentAuthor, localReply) => {
    if (!user) { setShowLoginModal(true); return; }
    setComments((prev) => insertReply(prev, parentLocalId, localReply));
    setOpenReplies((prev) => new Set([...prev, parentLocalId]));
    const parentDbId = findDbId(comments, parentLocalId);
    try {
      const res  = await fetch(`${API}/api/movies/${movie.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: localReply.text, parentId: parentDbId ?? undefined, replyToName: parentAuthor }),
      });
      const data = await res.json();
      if (res.ok && data.success)
        setComments((prev) => patchDbId(prev, localReply.id, data.data._dbId));
    } catch {}
  };

  const handleToggleReplies = (id) =>
    setOpenReplies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const handleAddComment = async () => {
    const text = newComment.trim();
    if (!text) return;
    if (!user) { setShowLoginModal(true); return; }
    const localId    = `local-${nextLocalId++}`;
    const optimistic = {
      id: localId, _dbId: localId, user: user.name ?? "You",
      isAdmin: false, replyTo: null, text,
      likes: 0, likedByMe: false, likedBy: [],
      timestamp: "Just now", userId: currentUserId, replies: [],
    };
    setComments((prev) => [...prev, optimistic]);
    setNewComment("");
    setPosting(true);
    try {
      const res  = await fetch(`${API}/api/movies/${movie.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (res.ok && data.success)
        setComments((prev) => patchDbId(prev, localId, data.data._dbId));
    } catch {} finally { setPosting(false); }
  };

  const totalCount = countAllComments(comments);

  return (
    <section className="page-container py-6 pb-10">
      <div
        className={`overflow-hidden shadow-lg ${v ? "rounded-md" : "rounded-3xl"} ${
          v
            ? "border-2 border-dashed border-amber-700/50 dark:border-amber-800/40 bg-[#fdf3d8] dark:bg-[#1e1508]"
            : "border border-turquoise-100 dark:border-turquoise-900/30 bg-white dark:bg-gray-900"
        }`}
      >
        {/* ── Header ── */}
        <div
          className={`flex items-center justify-between px-6 py-4 ${
            v
              ? "border-b-2 border-dashed border-amber-700/30 dark:border-amber-800/30 bg-[#f0dca0]/50 dark:bg-[#150f04]/50"
              : "border-b border-turquoise-100 dark:border-turquoise-900/30 bg-linear-to-r from-turquoise-50 to-white dark:from-turquoise-950/30 dark:to-gray-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageCircle
              size={20}
              className={
                v
                  ? "text-amber-700 dark:text-amber-500"
                  : "text-turquoise-600 dark:text-turquoise-400"
              }
            />
            <h2
              className={`font-display text-2xl font-bold ${v ? "text-amber-900 dark:text-amber-100" : "text-gray-900 dark:text-white"}`}
              style={v ? vFont : undefined}
            >
              {v ? "📜 Comments" : "Comments"}
            </h2>
          </div>
          <span
            className={`px-3 py-1 text-sm font-bold ${
              v
                ? "rounded-sm border border-amber-700/40 bg-amber-100/60 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400"
                : "rounded-full bg-turquoise-100 dark:bg-turquoise-900/40 text-turquoise-700 dark:text-turquoise-300"
            }`}
            style={v ? vFont : undefined}
          >
            {totalCount} {totalCount === 1 ? "Comment" : "Comments"}
          </span>
        </div>

        <div
          className={`p-4 md:p-6 ${v ? "bg-[#fdf3d8] dark:bg-[#1e1508]" : ""}`}
        >
          {/* ── Write comment ── */}
          <div className="mb-5">
            <div className="flex items-center gap-3">
              {/* Smart avatar for logged-in user */}
              {user?.avatar && !avatarErr ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  onError={() => setAvatarErr(true)}
                  className={`h-9 w-9 shrink-0 object-cover shadow-sm ${v ? "rounded-sm" : "rounded-full"}`}
                />
              ) : (
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center text-[11px] font-bold ${v ? "rounded-sm" : "rounded-full"} ${
                    user
                      ? v
                        ? "bg-amber-700/20 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-400"
                      : v
                        ? "bg-amber-700/10 text-amber-700/50 dark:bg-amber-900/15"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                  }`}
                  style={v ? vFont : undefined}
                >
                  {user ? (user.name?.[0]?.toUpperCase() ?? "?") : "?"}
                </div>
              )}

              <div
                className={`flex flex-1 items-center gap-2 border-2 px-4 py-2 transition-all ${v ? "rounded-sm" : "rounded-full"} ${
                  v
                    ? "border-amber-700/30 bg-[#f5e6c8]/60 dark:border-amber-800/30 dark:bg-[#1a1005]/60 focus-within:border-amber-600 focus-within:bg-[#fdf3d8] dark:focus-within:border-amber-600 dark:focus-within:bg-[#1e1508]"
                    : "border-gray-200 bg-gray-50 focus-within:border-turquoise-400 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:border-turquoise-600 dark:focus-within:bg-gray-900"
                }`}
              >
                {user && (
                  <div ref={emojiBtnRef}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!showEmoji) {
                          const rect =
                            emojiBtnRef.current?.getBoundingClientRect();
                          setEmojiAnchor(rect ?? null);
                        }
                        setShowEmoji((s) => !s);
                      }}
                      className={`shrink-0 transition ${v ? "text-amber-700/60 hover:text-amber-700" : "text-gray-400 hover:text-turquoise-600"}`}
                      title="Emoji"
                    >
                      <Smile size={16} />
                    </button>
                  </div>
                )}
                <input
                  ref={commentInputRef}
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  onClick={() => { if (!user) setShowLoginModal(true); }}
                  disabled={!user}
                  placeholder={user ? "Write a comment…" : "Log in to comment"}
                  className={`flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 disabled:cursor-pointer ${v ? "text-amber-900 dark:text-amber-200" : "text-gray-700 dark:text-gray-300"}`}
                  style={v ? vFont : undefined}
                />
                <button
                  onClick={() => { if (!user) { setShowLoginModal(true); return; } handleAddComment(); }}
                  disabled={(!newComment.trim() && !!user) || posting}
                  className={`transition disabled:cursor-not-allowed disabled:opacity-30 ${v ? "text-amber-700 hover:text-amber-800 dark:text-amber-500" : "text-turquoise-600 hover:text-turquoise-700 dark:text-turquoise-400"}`}
                >
                  {posting ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* Emoji picker portal — rendered outside overflow containers */}
            {showEmoji &&
              emojiAnchor &&
              createPortal(
                <div
                  style={{
                    position: "fixed",
                    top: Math.max(10, emojiAnchor.top - 360),
                    left: Math.min(
                      emojiAnchor.left,
                      (window.innerWidth ?? 1200) - 320,
                    ),
                    zIndex: 9999,
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <EmojiPicker
                    onEmojiClick={(d) => {
                      setNewComment((p) => p + d.emoji);
                      setShowEmoji(false);
                      commentInputRef.current?.focus();
                    }}
                    theme="auto"
                    lazyLoadEmojis
                    height={350}
                    width={300}
                    searchPlaceholder="Search emoji…"
                  />
                </div>,
                document.body,
              )}
          </div>

          {/* ── Comment threads ── */}
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2
                size={28}
                className={`animate-spin ${v ? "text-amber-600/70" : "text-turquoise-400"}`}
              />
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  parentId={null}
                  onReply={handleReply}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleReplies={handleToggleReplies}
                  openReplies={openReplies}
                  activeReplyId={activeReplyId}
                  onSetActiveReply={setActiveReplyId}
                  currentUserId={currentUserId}
                  isClassic={v}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <MessageCircle
                size={36}
                className={`mx-auto mb-3 ${v ? "text-amber-700/40 dark:text-amber-800" : "text-turquoise-300 dark:text-turquoise-700"}`}
              />
              <p
                className={
                  v
                    ? "text-amber-800/60 dark:text-amber-700"
                    : "text-gray-500 dark:text-gray-400"
                }
                style={v ? vFont : undefined}
              >
                No comments yet. Be the first!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Login Modal ── */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          title="Login to Comment"
          description="Sign in to like, reply, and leave comments on movies."
          icon="💬"
        />
      )}
    </section>
  );
}

// ─── Tree utility helpers ─────────────────────────────────────────────────────

function findNode(root, id) {
  if (root.id === id) return root;
  for (const r of root.replies ?? []) {
    const found = findNode(r, id);
    if (found) return found;
  }
  return null;
}

function findNodeAnywhere(comments, id) {
  for (const c of comments) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return null;
}

function findDbId(comments, localId) {
  const node = findNodeAnywhere(comments, localId);
  return node?._dbId ?? null;
}

function patchDbId(comments, localId, dbId) {
  return comments.map((c) => {
    if (c.id === localId) return { ...c, _dbId: dbId };
    if (c.replies?.length) return { ...c, replies: patchDbId(c.replies, localId, dbId) };
    return c;
  });
}
