import { useState } from "react";
import { createPortal } from "react-dom";
import {
  MessageCircle,
  Send,
  Heart,
  ChevronDown,
  ChevronUp,
  Shield,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Check,
  Users,
} from "lucide-react";
import { getCommentsForMovie, countAllComments, ADMIN_USER } from "../utils/movie";

// ─── Helpers ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-violet-500", "bg-sky-500", "bg-rose-500", "bg-amber-500",
  "bg-emerald-500", "bg-indigo-500", "bg-pink-500", "bg-orange-500",
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

function generateEmail(name) {
  if (name === "You") return "you@pixeltales.com";
  if (name === ADMIN_USER) return "admin@pixeltales.com";
  return name.toLowerCase().replace(/\s+/g, ".") + "@pixeltales.com";
}

const YOU_USER = { name: "You", email: "you@pixeltales.com" };

function insertReply(comments, targetId, reply) {
  return comments.map((c) => {
    if (c.id === targetId) return { ...c, replies: [...(c.replies ?? []), reply] };
    if (c.replies?.length) return { ...c, replies: insertReply(c.replies, targetId, reply) };
    return c;
  });
}

function toggleLike(comments, targetId) {
  return comments.map((c) => {
    if (c.id === targetId) {
      const liked = !c.likedByMe;
      const likedBy = liked
        ? [...(c.likedBy ?? []), YOU_USER]
        : (c.likedBy ?? []).filter((u) => u.name !== "You");
      return { ...c, likedByMe: liked, likes: c.likes + (liked ? 1 : -1), likedBy };
    }
    if (c.replies?.length) return { ...c, replies: toggleLike(c.replies, targetId) };
    return c;
  });
}

function deleteComment(comments, targetId) {
  return comments
    .filter((c) => c.id !== targetId)
    .map((c) =>
      c.replies?.length ? { ...c, replies: deleteComment(c.replies, targetId) } : c
    );
}

function editCommentText(comments, targetId, newText) {
  return comments.map((c) => {
    if (c.id === targetId) return { ...c, text: newText };
    if (c.replies?.length)
      return { ...c, replies: editCommentText(c.replies, targetId, newText) };
    return c;
  });
}

let nextId = 1000;
const MAX_DEPTH = 2;

// ─── Likers Modal (rendered via portal to escape any CSS transform parent) ──

function LikersModal({ likers, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Heart size={16} className="fill-rose-500 text-rose-500" />
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Liked by
            </h3>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              {likers.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
          >
            <X size={16} />
          </button>
        </div>

        {/* Liker list */}
        <div className="max-h-72 space-y-1 overflow-y-auto p-3">
          {likers.length === 0 ? (
            <div className="py-6 text-center">
              <Users size={28} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-400">No likes yet</p>
            </div>
          ) : (
            likers.map((liker, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${
                    liker.name === "You" ? "bg-turquoise-500" : getAvatarColor(liker.name)
                  }`}
                >
                  {getInitials(liker.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {liker.name}
                  </p>
                  <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">
                    {liker.email}
                  </p>
                </div>
                {liker.name === "You" && (
                  <span className="ml-auto shrink-0 rounded-full bg-turquoise-100 px-2 py-0.5 text-[10px] font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
                    You
                  </span>
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

// ─── @Mention badge with hover profile card ──────────────────────────────────

function MentionBadge({ name }) {
  const isAdminUser = name === ADMIN_USER;
  const avatarBg = isAdminUser ? "bg-turquoise-600" : getAvatarColor(name);
  const initials = isAdminUser ? <Shield size={11} /> : getInitials(name);
  const email = generateEmail(name);

  return (
    <span className="group/mention relative mr-0.5 inline-block">
      <span className="cursor-pointer font-semibold text-turquoise-600 hover:underline dark:text-turquoise-400">
        @{name}
      </span>
      <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-200 group-hover/mention:visible group-hover/mention:pointer-events-auto group-hover/mention:opacity-100">
        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${avatarBg} ${
                isAdminUser ? "ring-2 ring-turquoise-400 ring-offset-1" : ""
              }`}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{name}</p>
              <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">{email}</p>
              <p className="mt-0.5 text-[10px] font-semibold text-turquoise-600 dark:text-turquoise-400">
                {isAdminUser ? "PixelTales Admin" : "PixelTales Member"}
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
}) {
  const [showMenu, setShowMenu]     = useState(false);
  const [isEditing, setIsEditing]   = useState(false);
  const [editText, setEditText]     = useState(comment.text);
  const [showLikers, setShowLikers] = useState(false);
  const [replyText, setReplyText]   = useState("");

  // Controlled by root: only one reply box open site-wide
  const showReplyInput = activeReplyId === comment.id;

  const isAdmin      = comment.user === ADMIN_USER;
  const isOwnComment = comment.user === "You";
  const avatarBg     = isAdmin ? "bg-turquoise-600" : getAvatarColor(comment.user);
  const hasReplies   = (comment.replies?.length ?? 0) > 0;
  const isOpen       = openReplies.has(comment.id);

  const enterEdit = () => { setEditText(comment.text); setIsEditing(true); setShowMenu(false); };

  const saveEdit = () => {
    const text = editText.trim();
    if (!text) return;
    onEdit(comment.id, text);
    setIsEditing(false);
  };

  const submitReply = () => {
    const text = replyText.trim();
    if (!text) return;
    const targetId = depth >= MAX_DEPTH ? parentId : comment.id;
    onReply(targetId, {
      id: `new-${nextId++}`,
      user: "You",
      isAdmin: false,
      replyTo: comment.user,
      text,
      likes: 0,
      likedByMe: false,
      likedBy: [],
      timestamp: "Just now",
      replies: [],
    });
    setReplyText("");
    onSetActiveReply(null);
  };

  return (
    <div>
      {/* ── Comment card ──────────────────────────────────────── */}
      <div
        className={`rounded-2xl p-3.5 transition-all duration-200 ${
          isAdmin
            ? "border border-turquoise-200 bg-turquoise-50/80 dark:border-turquoise-700/50 dark:bg-turquoise-950/30"
            : "border border-gray-100 bg-gray-50 hover:border-turquoise-200 hover:bg-turquoise-50/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-turquoise-800"
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${avatarBg} ${
              isAdmin ? "ring-2 ring-turquoise-400 ring-offset-1 dark:ring-offset-gray-900" : ""
            }`}
          >
            {isAdmin ? <Shield size={13} /> : getInitials(comment.user)}
          </div>

          <div className="min-w-0 flex-1">
            {/* Header row */}
            <div className="mb-1 flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`text-sm font-bold ${isAdmin ? "text-turquoise-700 dark:text-turquoise-300" : "text-gray-900 dark:text-white"}`}>
                  {comment.user}
                </span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-turquoise-100 px-2 py-0.5 text-[10px] font-bold text-turquoise-700 dark:bg-turquoise-900/60 dark:text-turquoise-300">
                    <Shield size={9} /> Admin
                  </span>
                )}
                <span className="text-[11px] text-gray-400 dark:text-gray-500">{comment.timestamp}</span>
              </div>

              {/* Three-dot menu — own comments only */}
              {isOwnComment && (
                <div className="relative ml-1 shrink-0">
                  <button
                    onClick={() => setShowMenu((v) => !v)}
                    className="flex size-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                  {showMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                      <div className="absolute right-0 top-7 z-20 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                        <button
                          onClick={enterEdit}
                          className="flex w-full items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-turquoise-50 hover:text-turquoise-700 dark:text-gray-300 dark:hover:bg-turquoise-950/40"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <button
                          onClick={() => { onDelete(comment.id); setShowMenu(false); }}
                          className="flex w-full items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
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
                <textarea
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) saveEdit();
                    if (e.key === "Escape") setIsEditing(false);
                  }}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-turquoise-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-turquoise-400/50 dark:border-turquoise-700 dark:bg-gray-900 dark:text-gray-300"
                />
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={saveEdit} disabled={!editText.trim()} className="inline-flex items-center gap-1.5 rounded-lg bg-turquoise-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-turquoise-700 disabled:opacity-40">
                    <Check size={12} /> Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-700">
                    Cancel
                  </button>
                  <span className="text-[11px] text-gray-400">Ctrl+Enter to save</span>
                </div>
              </div>
            ) : (
              <p className={`text-sm leading-relaxed ${isAdmin ? "text-turquoise-800 dark:text-turquoise-100" : "text-gray-700 dark:text-gray-300"}`}>
                {comment.replyTo && <MentionBadge name={comment.replyTo} />}
                {comment.text}
              </p>
            )}

            {/* Action row */}
            {!isEditing && (
              <div className="mt-2.5 flex flex-wrap items-center gap-4">
                {/* Like */}
                <button
                  onClick={() => onLike(comment.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                    comment.likedByMe ? "text-rose-500 dark:text-rose-400" : "text-gray-400 hover:text-rose-500 dark:hover:text-rose-400"
                  }`}
                >
                  <Heart size={12} fill={comment.likedByMe ? "currentColor" : "none"} />
                  <span>{comment.likedByMe ? "Liked" : "Like"}</span>
                </button>

                {/* Reply — opens the reply box; closes any other open one */}
                <button
                  onClick={() => onSetActiveReply(showReplyInput ? null : comment.id)}
                  className={`text-xs font-semibold transition-colors ${
                    showReplyInput
                      ? "text-turquoise-600 dark:text-turquoise-400"
                      : "text-gray-400 hover:text-turquoise-600 dark:hover:text-turquoise-400"
                  }`}
                >
                  Reply
                </button>

                {/* View / hide replies */}
                {hasReplies && (
                  <button
                    onClick={() => onToggleReplies(comment.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-turquoise-600 transition-colors hover:text-turquoise-700 dark:text-turquoise-400"
                  >
                    {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    {isOpen ? "Hide" : "View"} {comment.replies.length}{" "}
                    {comment.replies.length === 1 ? "reply" : "replies"}
                  </button>
                )}

                {/* Like count — far right, hoverable tooltip, clickable modal */}
                {comment.likes > 0 && (
                  <div className="group/likecount relative ml-auto">
                    <button
                      onClick={() => setShowLikers(true)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 transition-colors hover:text-rose-500 dark:hover:text-rose-400"
                    >
                      <Heart size={11} className={comment.likedByMe ? "fill-rose-400 text-rose-400" : ""} />
                      <span>{comment.likes}</span>
                    </button>
                    <div className="pointer-events-none invisible absolute bottom-full right-0 z-30 mb-1.5 opacity-0 transition-all duration-150 group-hover/likecount:visible group-hover/likecount:opacity-100">
                      <div className="whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow dark:bg-gray-700">
                        View Likes
                      </div>
                      <div className="ml-auto mr-2 h-1.5 w-1.5 -translate-y-px rotate-45 bg-gray-900 dark:bg-gray-700" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Reply input — auto-closes via blur, only one open at a time ── */}
        {showReplyInput && (
          <div
            className="ml-11 mt-3 flex items-center gap-2"
            onBlur={(e) => {
              // Close when focus leaves the entire reply-input container
              if (!e.currentTarget.contains(e.relatedTarget)) {
                onSetActiveReply(null);
              }
            }}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-turquoise-100 text-[10px] font-bold text-turquoise-600 dark:bg-turquoise-900/40 dark:text-turquoise-400">
              You
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 focus-within:border-turquoise-400 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-turquoise-600">
              <span className="shrink-0 text-xs font-semibold text-turquoise-600 dark:text-turquoise-400">
                @{comment.user}
              </span>
              <input
                autoFocus
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitReply()}
                placeholder="Write a reply…"
                className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-300"
              />
              <button
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="shrink-0 text-turquoise-600 transition hover:text-turquoise-700 disabled:cursor-not-allowed disabled:opacity-30 dark:text-turquoise-400"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Likers modal — portalled to body so position:fixed always works */}
      {showLikers && (
        <LikersModal likers={comment.likedBy ?? []} onClose={() => setShowLikers(false)} />
      )}

      {/* ── Nested replies with curved L-connectors ───────────────── */}
      {hasReplies && isOpen && (
        <div className="ml-7.5 mt-2 border-l-2 border-turquoise-200/60 dark:border-turquoise-800/50">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="relative pl-3 pt-2">
              {/* Curved connector: continues the vertical line → arcs into the reply */}
              <div className="absolute -left-0.5 top-0 h-10 w-3 rounded-bl-[6px] border-b-2 border-l-2 border-turquoise-200/60 dark:border-turquoise-800/50" />
              <CommentThread
                comment={reply}
                depth={depth + 1}
                parentId={comment.id}
                onReply={onReply}
                onLike={onLike}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleReplies={onToggleReplies}
                openReplies={openReplies}
                activeReplyId={activeReplyId}
                onSetActiveReply={onSetActiveReply}
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
  const initial = getCommentsForMovie(movie.id);

  const [comments, setComments]         = useState(initial);
  const [newComment, setNewComment]     = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null); // only one reply input open

  const [openReplies, setOpenReplies] = useState(() => {
    const ids = new Set();
    initial.forEach((c) => { if (c.replies?.length) ids.add(c.id); });
    return ids;
  });

  const totalCount = countAllComments(comments);

  const handleLike   = (id)          => setComments((p) => toggleLike(p, id));
  const handleDelete = (id)          => setComments((p) => deleteComment(p, id));
  const handleEdit   = (id, newText) => setComments((p) => editCommentText(p, id, newText));

  const handleReply = (parentId, reply) => {
    setComments((p) => insertReply(p, parentId, reply));
    setOpenReplies((p) => new Set([...p, parentId]));
  };

  const handleToggleReplies = (id) => {
    setOpenReplies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddComment = () => {
    const text = newComment.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      {
        id: `new-${nextId++}`,
        user: "You",
        isAdmin: false,
        replyTo: null,
        text,
        likes: 0,
        likedByMe: false,
        likedBy: [],
        timestamp: "Just now",
        replies: [],
      },
    ]);
    setNewComment("");
  };

  return (
    <section className="page-container py-6 pb-10">
      <div className="overflow-hidden rounded-3xl border border-turquoise-100 bg-white shadow-lg dark:border-turquoise-900/30 dark:bg-gray-900">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-turquoise-100 bg-linear-to-r from-turquoise-50 to-white px-6 py-4 dark:border-turquoise-900/30 dark:from-turquoise-950/30 dark:to-gray-900">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} className="text-turquoise-600 dark:text-turquoise-400" />
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Comments
            </h2>
          </div>
          <span className="rounded-full bg-turquoise-100 px-3 py-1 text-sm font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
            {totalCount} {totalCount === 1 ? "Comment" : "Comments"}
          </span>
        </div>

        <div className="p-4 md:p-6">
          {/* ── Write comment ─────────────────────────────────── */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-turquoise-100 text-[11px] font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-400">
              You
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-full border-2 border-gray-200 bg-gray-50 px-4 py-2 transition-all focus-within:border-turquoise-400 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:border-turquoise-600 dark:focus-within:bg-gray-900">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Write a comment…"
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-300"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="text-turquoise-600 transition hover:text-turquoise-700 disabled:cursor-not-allowed disabled:opacity-30 dark:text-turquoise-400"
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* ── Comment threads ───────────────────────────────── */}
          {comments.length > 0 ? (
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
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <MessageCircle size={36} className="mx-auto mb-3 text-turquoise-300 dark:text-turquoise-700" />
              <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
