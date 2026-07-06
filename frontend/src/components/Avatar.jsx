import { useState } from 'react'

/* Shared Avatar component
   - Renders an <img> when `avatar` URL is available
   - Otherwise renders initials on a turquoise gradient background
   - Accepts `user` object or `name`/`avatar` props and `size` (number)
*/
export default function Avatar({ user, name, avatar, size = 9, className = '' }) {
  const [err, setErr] = useState(false)
  const theName = user?.name ?? name ?? ''
  const theAvatar = user?.avatar ?? avatar ?? ''
  const initials = (theName || '?')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')

  const px = size * 4
  const style = { width: px, height: px }

//   const TURQ_GRAD = 'linear-gradient(135deg,#06b6d4,#0891b2)'

  if (theAvatar && !err) {
    return (
      <img
        src={theAvatar}
        alt={theName}
        onError={() => setErr(true)}
        style={style}
        className={`size-${size} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <span
      className={`flex size-${size} items-center justify-center rounded-full font-bold text-white uppercase select-none ${className} bg-gradient-to-br from-turquoise-500 to-turquoise-400 dark:from-turquoise-400 dark:to-turquoise-600`}
      style={{ ...style }}
    >
      {initials}
    </span>
  )
}
