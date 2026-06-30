import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Html5Qrcode } from 'html5-qrcode'
import {
  PartyPopper,
  Home,
  Ticket,
  Rocket,
  Clapperboard,
  Users,
  Play,
  ChevronDown,
  Copy,
  CheckCheck,
  QrCode,
  ScanLine,
  Hash,
  Camera,
  X,
} from 'lucide-react'
import { PARTY_MOVIE_OPTIONS, CARTOON_OPTIONS, getMovieTitle } from '../utils/movie'
import MovieHoverPreview from '../components/MovieHoverPreview'
import { useAuth } from '../context/AuthContext'

/* ─── Custom Cartoon Select ──────────────────────────── */
function CartoonSelect({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = CARTOON_OPTIONS.find((c) => c.id === value)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative mt-1" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`input-field flex w-full items-center justify-between gap-3 text-left transition-opacity ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        <span className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
          {selected?.label ?? 'Select a cartoon…'}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-200 ${
            disabled
              ? 'text-gray-400 dark:text-gray-600'
              : 'text-turquoise-600 dark:text-turquoise-400'
          } ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && !disabled && (
        <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
          {CARTOON_OPTIONS.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => { onChange(c.id); setOpen(false) }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-turquoise-50 dark:hover:bg-turquoise-950/40 ${
                  c.id === value
                    ? 'bg-turquoise-50 font-bold text-turquoise-700 dark:bg-turquoise-950/40 dark:text-turquoise-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {disabled && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          🔒 Pre-selected from movie page
        </p>
      )}
    </div>
  )
}

/* ─── Custom Movie Select ────────────────────────────── */
function MovieSelect({ value, onChange, options, disabled }) {
  const [open,    setOpen]    = useState(false)
  const [hovered, setHovered] = useState(null)
  const hideTimer = useRef(null)
  const ref = useRef(null)
  const selected = options.find((m) => m.id === value)

  const showPreview = (movie, e) => {
    clearTimeout(hideTimer.current)
    setHovered({ movie, rect: e.currentTarget.getBoundingClientRect() })
  }
  const hidePreview = () => {
    hideTimer.current = setTimeout(() => setHovered(null), 180)
  }
  const keepPreview = () => {
    clearTimeout(hideTimer.current)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest('[data-movie-preview]')) return
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        clearTimeout(hideTimer.current)
        setHovered(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative mt-1" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`input-field flex w-full items-center justify-between gap-3 text-left transition-opacity ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        <span className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
          {selected ? getMovieTitle(selected) : 'Select a movie…'}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-200 ${
            disabled
              ? 'text-gray-400 dark:text-gray-600'
              : 'text-turquoise-600 dark:text-turquoise-400'
          } ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && !disabled && (
        <ul className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
          {options.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onMouseEnter={(e) => showPreview(m, e)}
                onMouseLeave={hidePreview}
                onClick={() => { onChange(m.id); setOpen(false); clearTimeout(hideTimer.current); setHovered(null) }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-turquoise-50 dark:hover:bg-turquoise-950/40 ${
                  m.id === value
                    ? 'bg-turquoise-50 font-bold text-turquoise-700 dark:bg-turquoise-950/40 dark:text-turquoise-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {m.thumbnail ? (
                  <img src={m.thumbnail} alt="" className={`h-8 w-12 shrink-0 object-cover ${m.modern === false ? 'rounded-sm' : 'rounded-lg'}`} />
                ) : (
                  <div className="h-8 w-12 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800" />
                )}
                <span className="truncate">{getMovieTitle(m)}</span>
                {m.modern === false && (
                  <span className="ml-auto shrink-0 rounded-sm bg-amber-100 px-1.5 py-0.5 text-[9px] font-black text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                    CLASSIC
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Hover preview */}
      <MovieHoverPreview
        movie={hovered?.movie}
        anchorRect={hovered?.rect}
        side="left"
        onEnter={keepPreview}
        onLeave={hidePreview}
      />

      {disabled && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          🔒 Pre-selected from movie page
        </p>
      )}
    </div>
  )
}

/* ─── QR Scanner ─────────────────────────────────────── */
function QrScanner({ onResult, onClose }) {
  const scannerRef = useRef(null)
  const instanceRef = useRef(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-scanner-region')
    instanceRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          scanner.stop().catch(() => {})
          onResult(decodedText)
        },
        () => {}
      )
      .catch((err) => {
        setError('Camera access denied. Please allow camera permissions.')
        console.error(err)
      })

    return () => {
      scanner.stop().catch(() => {})
    }
  }, [onResult])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative overflow-hidden rounded-2xl border-2 border-turquoise-300 dark:border-turquoise-700">
        <div id="qr-scanner-region" ref={scannerRef} style={{ width: 260 }} />
        {/* Corner decorations */}
        <span className="pointer-events-none absolute top-2 left-2 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 border-turquoise-500" />
        <span className="pointer-events-none absolute top-2 right-2 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-turquoise-500" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-turquoise-500" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-turquoise-500" />
      </div>
      {error && (
        <p className="rounded-xl bg-rose-50 px-4 py-2 text-center text-xs text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
          {error}
        </p>
      )}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        Point your camera at a PixelTales party QR code
      </p>
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <X size={14} /> Cancel Scanner
      </button>
    </div>
  )
}

/* ─── Main Party Page ─────────────────────────────────── */
export default function Party() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, token, API } = useAuth()

  // Detect if we arrived from a movie details page (locked selections)
  const urlCartoon = searchParams.get('cartoon') ?? ''
  const urlMovie   = searchParams.get('movie')   ?? ''
  const isLocked   = !!(urlCartoon && urlMovie)

  const defaultCartoon = urlCartoon || CARTOON_OPTIONS[0]?.id || ''
  const [selectedCartoon, setSelectedCartoon] = useState(defaultCartoon)

  const filteredMovies = PARTY_MOVIE_OPTIONS.filter(
    (m) => !selectedCartoon || m.cartoonId === selectedCartoon
  )

  const defaultMovie =
    urlMovie ||
    filteredMovies[0]?.id ||
    ''
  const [selectedMovie, setSelectedMovie] = useState(defaultMovie)

  const [created, setCreated] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [inviteTab, setInviteTab] = useState('code') // 'code' | 'qr'
  const [codeCopied, setCodeCopied] = useState(false)

  const [roomCode, setRoomCode] = useState('')
  const [joinTab, setJoinTab] = useState('code') // 'code' | 'qr'
  const [scannerActive, setScannerActive] = useState(false)

  const selectedMovie_obj = PARTY_MOVIE_OPTIONS.find((m) => m.id === selectedMovie)

  // When cartoon changes (if not locked), reset movie to first of that cartoon
  const handleCartoonChange = (id) => {
    setSelectedCartoon(id)
    const first = PARTY_MOVIE_OPTIONS.find((m) => m.cartoonId === id)
    setSelectedMovie(first?.id ?? '')
  }

  // Read ?code= from URL (e.g. after scanning QR)
  useEffect(() => {
    const code = searchParams.get('code')
    if (code) setRoomCode(code.toUpperCase().slice(0, 8))
  }, [searchParams])

  const partyUrl = generatedCode
    ? `${window.location.origin}/party/room?code=${generatedCode}&movie=${selectedMovie}`
    : ''

  const handleCreate = () => {
    const code = `PT${Math.floor(100000 + Math.random() * 900000)}`
    setGeneratedCode(code)
    setCreated(true)
    setInviteTab('code')
    setCodeCopied(false)
    // Persist room metadata so join-by-code works from same device
    localStorage.setItem(`pt_room_${code}`, JSON.stringify({
      code,
      movieId:    selectedMovie,
      movieTitle: getMovieTitle(selectedMovie_obj),
      createdAt:  new Date().toISOString(),
    }))
    // Register session in backend so cross-device join works
    if (user && token) {
      fetch(`${API}/api/party`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ code, movieId: selectedMovie }),
      }).catch(() => {})
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  const handleQrResult = (url) => {
    setScannerActive(false)
    // If it's a URL, navigate to it; otherwise treat as room code
    if (url.startsWith('http')) {
      const parsed = new URL(url)
      const code = parsed.searchParams.get('code')
      if (code) {
        setRoomCode(code.toUpperCase())
        setJoinTab('code')
      } else {
        window.location.href = url
      }
    } else {
      setRoomCode(url.toUpperCase().slice(0, 8))
      setJoinTab('code')
    }
  }

  const handleJoin = async () => {
    const code = roomCode.trim().toUpperCase()
    if (code.length < 6) return

    // 1. Try localStorage (same device, instant)
    const stored = localStorage.getItem(`pt_room_${code}`)
    if (stored) {
      const room = JSON.parse(stored)
      navigate(`/party/room?code=${code}&movie=${room.movieId}`)
      return
    }

    // 2. Look up from backend (cross-device)
    try {
      const res  = await fetch(`${API}/api/party/${code}`)
      const data = await res.json()
      if (data.success) {
        navigate(`/party/room?code=${code}&movie=${data.data.movieId}`)
        return
      }
    } catch {}

    alert(`Room "${code}" not found.\n\nMake sure:\n• The host has clicked "Start Party" first\n• You typed the code correctly`)
  }

  const handleStartParty = async () => {
    let code = generatedCode
    if (!code) {
      code = `PT${Math.floor(100000 + Math.random() * 900000)}`
      setGeneratedCode(code)
      setCreated(true)
      localStorage.setItem(`pt_room_${code}`, JSON.stringify({
        code, movieId: selectedMovie,
        movieTitle: getMovieTitle(selectedMovie_obj),
        createdAt: new Date().toISOString(),
      }))
      if (user && token) {
        await fetch(`${API}/api/party`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body:    JSON.stringify({ code, movieId: selectedMovie }),
        }).catch(() => {})
      }
    }
    navigate(`/party/room?code=${code}&movie=${selectedMovie}`)
  }

  return (
    <div className="page-container max-w-4xl py-10">
      <header className="mb-8 text-center">
        <span className="text-4xl">🎉</span>
        <h1 className="font-display mt-2 text-3xl text-turquoise-700 dark:text-turquoise-400">
          Watch Party
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-gray-600 dark:text-gray-400">
          Watch cartoons together with friends! Everyone streams locally — perfectly in sync.
        </p>
      </header>

      <div className="mb-8 grid gap-5 md:grid-cols-2">
        {/* ── Create a Room ── */}
        <div className="card-surface p-6">
          <h2 className="flex items-center gap-2 font-bold">
            <Home size={22} className="text-turquoise-600" />
            Create a Room
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Start a party and invite friends with a room code or QR.
          </p>

          {isLocked && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              🔒 Selections pre-loaded from movie page — you can't change them.
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-bold">Cartoon</span>
              <CartoonSelect
                value={selectedCartoon}
                onChange={handleCartoonChange}
                disabled={isLocked}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">Movie</span>
              <MovieSelect
                value={selectedMovie}
                onChange={setSelectedMovie}
                options={filteredMovies}
                disabled={isLocked}
              />
            </label>
          </div>

          <button
            type="button"
            className="btn-primary mt-4 w-full"
            onClick={handleCreate}
          >
            <Rocket size={18} />
            {created ? 'New Room' : 'Create Room'}
          </button>

          {/* Invite section */}
          {created && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-turquoise-200 dark:border-turquoise-800">
              {/* Tabs */}
              <div className="flex border-b border-turquoise-100 dark:border-turquoise-800/60">
                {[
                  { id: 'code', label: 'Invite via Code', icon: Hash },
                  { id: 'qr', label: 'Invite via QR', icon: QrCode },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInviteTab(id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-colors ${
                      inviteTab === id
                        ? 'bg-turquoise-50 text-turquoise-700 dark:bg-turquoise-950/50 dark:text-turquoise-300'
                        : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {inviteTab === 'code' ? (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Room Code</p>
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-turquoise-50 px-5 py-2 font-mono text-2xl font-extrabold tracking-[0.2em] text-turquoise-700 dark:bg-turquoise-950/50 dark:text-turquoise-300">
                        {generatedCode}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="rounded-xl border border-gray-200 p-2.5 text-gray-500 transition hover:bg-turquoise-50 hover:text-turquoise-600 dark:border-gray-700 dark:hover:bg-turquoise-950/40"
                        title="Copy code"
                      >
                        {codeCopied ? <CheckCheck size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Movie: <strong className="text-gray-600 dark:text-gray-300">{getMovieTitle(selectedMovie_obj)}</strong>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Scan to join — works with any QR scanner
                    </p>
                    <div className="rounded-2xl border-2 border-turquoise-200 bg-white p-3 dark:border-turquoise-800 dark:bg-gray-950">
                      <QRCodeSVG
                        value={partyUrl}
                        size={180}
                        bgColor="transparent"
                        fgColor="currentColor"
                        className="text-gray-900 dark:text-white"
                        level="M"
                      />
                    </div>
                    <p className="max-w-[200px] break-all text-center text-[10px] text-gray-400 dark:text-gray-500">
                      {partyUrl}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Start Party CTA — shown only once room is created */}
          {created && (
          <button
            type="button"
            onClick={handleStartParty}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-turquoise-600 to-turquoise-500 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:from-turquoise-500 hover:to-turquoise-400 active:scale-95 flex items-center justify-center gap-2"
          >
            <Play size={17} className="fill-white" />
            🎬 Start Party
          </button>
          )}
        </div>

        {/* ── Join a Room ── */}
        <div className="card-surface p-6">
          <h2 className="flex items-center gap-2 font-bold">
            <Ticket size={22} className="text-turquoise-600" />
            Join a Room
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Enter the room code or scan a QR shared by your friend.
          </p>

          {/* Join tabs */}
          <div className="mt-4 flex rounded-2xl border border-gray-200 p-0.5 dark:border-gray-700">
            {[
              { id: 'code', label: 'Via Code', icon: Hash },
              { id: 'qr', label: 'Scan QR', icon: ScanLine },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => { setJoinTab(id); setScannerActive(false) }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                  joinTab === id
                    ? 'bg-turquoise-700 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {joinTab === 'code' ? (
            <>
              <label className="mt-4 block">
                <span className="text-sm font-bold">Room Code</span>
                <input
                  className="input-field mt-1 uppercase tracking-widest font-mono"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 8))}
                  placeholder="E.G. PT123456"
                  maxLength={8}
                />
              </label>
              <button
                type="button"
                onClick={handleJoin}
                className="mt-4 w-full rounded-full bg-turquoise-100 py-3 text-sm font-extrabold text-turquoise-800 transition hover:bg-turquoise-200 disabled:opacity-50 dark:bg-turquoise-900/50 dark:text-turquoise-300"
                disabled={roomCode.length < 6}
              >
                <PartyPopper size={18} className="mr-1 inline" />
                Join Party
              </button>
            </>
          ) : (
            <div className="mt-4">
              {!scannerActive ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-turquoise-300 py-8 dark:border-turquoise-700">
                  <Camera size={36} className="text-turquoise-400 dark:text-turquoise-600" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Scan a Party QR Code</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Use your camera to scan a PixelTales QR.<br />
                      Or use any external scanner — it opens directly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScannerActive(true)}
                    className="flex items-center gap-2 rounded-2xl bg-turquoise-700 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-turquoise-600 active:scale-95"
                  >
                    <ScanLine size={16} /> Open Scanner
                  </button>
                </div>
              ) : (
                <QrScanner
                  onResult={handleQrResult}
                  onClose={() => setScannerActive(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* How it works */}
      <section className="rounded-2xl bg-turquoise-100 p-6 dark:bg-turquoise-950/40">
        <h2 className="font-display mb-5 text-xl text-turquoise-800 dark:text-turquoise-300">
          How it works 🤔
        </h2>
        <div className="grid gap-6 text-center sm:grid-cols-3">
          {[
            { icon: Clapperboard, title: 'Choose Movie', desc: 'Host picks from all available movies.' },
            { icon: Users, title: 'Invite Friends', desc: 'Share the room code or QR code.' },
            { icon: Play, title: 'Watch Together', desc: 'Everyone streams locally. Host syncs play, pause & seek.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <Icon className="mx-auto size-7 text-turquoise-600" />
              <h3 className="mt-2 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
