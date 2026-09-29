import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { PortfolioEngine, type EngineRefs } from '@/lib/engine'
import { EMAIL, GITHUB, LINKEDIN, SECTIONS } from '@/data/site'

export interface Command {
  tag: string
  label: string
  hint: string
  run: () => void
}

const singaporeTime = () =>
  new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Singapore',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })

export function usePortfolio() {
  const refs: EngineRefs = {
    nav: useRef<HTMLElement>(null),
    ind: useRef<HTMLDivElement>(null),
    ring: useRef<SVGSVGElement>(null),
    tip: useRef<HTMLDivElement>(null),
    cursor: useRef<HTMLDivElement>(null),
    scrollLine: useRef<HTMLSpanElement>(null),
    stmt: useRef<HTMLParagraphElement>(null),
    photo: useRef<HTMLDivElement>(null),
    expSec: useRef<HTMLElement>(null),
    detail: useRef<HTMLDivElement>(null),
    hsec: useRef<HTMLElement>(null),
    track: useRef<HTMLDivElement>(null),
    hCount: useRef<HTMLSpanElement>(null),
    hBar: useRef<HTMLDivElement>(null),
    rowA: useRef<HTMLDivElement>(null),
    rowB: useRef<HTMLDivElement>(null),
    canvas: useRef<HTMLCanvasElement>(null),
  }
  const inputRef = useRef<HTMLInputElement>(null)

  const [section, setSection] = useState(-1)
  const [exp, setExp] = useState(0)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [copied, setCopied] = useState(false)
  const [clock, setClock] = useState(singaporeTime)

  // Mirrors so the rAF loop and the global key handler can read current values
  // without being torn down and rebuilt on every state change.
  const sectionRef = useRef(section)
  const expRef = useRef(exp)
  sectionRef.current = section
  expRef.current = exp

  const engineRef = useRef<PortfolioEngine | null>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── engine lifecycle ─────────────────────────────────────────── */
  useEffect(() => {
    const engine = new PortfolioEngine(refs, {
      getSection: () => sectionRef.current,
      setSection: (i) => setSection(i),
      getExp: () => expRef.current,
      setExp: (i) => setExp(i),
    })
    engineRef.current = engine
    engine.mount()
    return () => {
      engine.unmount()
      engineRef.current = null
    }
    // Refs are stable for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    engineRef.current?.flashSection()
  }, [section])

  useEffect(() => {
    engineRef.current?.animateDetail()
  }, [exp])

  useEffect(() => {
    const t = setInterval(() => setClock(singaporeTime()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current) }, [])

  /* ── palette ──────────────────────────────────────────────────── */
  const openPalette = useCallback(() => {
    setOpen(true)
    setQ('')
    setSel(0)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  const closePalette = useCallback(() => setOpen(false), [])

  const copyEmail = useCallback(() => {
    try {
      void navigator.clipboard.writeText(EMAIL)
    } catch {
      /* clipboard can be unavailable over http or without permission */
    }
    setCopied(true)
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 1800)
  }, [])

  const go = useCallback((id: string) => engineRef.current?.go(id), [])

  const commands = useMemo<Command[]>(
    () => [
      ...SECTIONS.map(({ id, num, label }) => ({
        tag: num,
        label,
        hint: 'section',
        run: () => engineRef.current?.go(id),
      })),
      { tag: '↑', label: 'Back to top', hint: '', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      { tag: '@', label: 'Copy email', hint: EMAIL, run: () => copyEmail() },
      { tag: 'gh', label: 'GitHub', hint: 'jereeemyyyy', run: () => window.open(GITHUB, '_blank') },
      { tag: 'in', label: 'LinkedIn', hint: 'jeremysimwenze', run: () => window.open(LINKEDIN, '_blank') },
    ],
    [copyEmail],
  )

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return commands.filter((c) => !needle || (c.label + ' ' + c.hint).toLowerCase().includes(needle))
  }, [commands, q])

  const runCommand = useCallback(
    (c: Command) => {
      closePalette()
      setTimeout(() => c.run(), 60)
    },
    [closePalette],
  )

  /* Kept in a ref so the window key listener is bound exactly once. */
  const keyState = useRef({ open, sel, filtered, openPalette, closePalette, runCommand })
  keyState.current = { open, sel, filtered, openPalette, closePalette, runCommand }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = keyState.current
      const tag = ((e.target as HTMLElement | null)?.tagName || '').toLowerCase()
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (s.open) s.closePalette()
        else s.openPalette()
        return
      }
      if (!s.open) {
        if (e.key === '/' && tag !== 'input' && tag !== 'textarea') {
          e.preventDefault()
          s.openPalette()
        }
        return
      }
      if (e.key === 'Escape') s.closePalette()
      else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSel((v) => Math.min(s.filtered.length - 1, v + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSel((v) => Math.max(0, v - 1))
      } else if (e.key === 'Enter' && s.filtered[s.sel]) {
        e.preventDefault()
        s.runCommand(s.filtered[s.sel])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── nav handlers ─────────────────────────────────────────────── */
  const navAct = useCallback(
    (e: MouseEvent, fn: () => void) => engineRef.current?.navAct(e, fn, openPalette),
    [openPalette],
  )

  const goTop = useCallback(
    (e: MouseEvent) => navAct(e, () => window.scrollTo({ top: 0, behavior: 'smooth' })),
    [navAct],
  )

  const goSection = useCallback((e: MouseEvent, id: string) => navAct(e, () => go(id)), [navAct, go])

  const openPaletteFromNav = useCallback((e: MouseEvent) => navAct(e, openPalette), [navAct, openPalette])

  const setHover = useCallback((i: number | null) => {
    if (engineRef.current) engineRef.current.hoverI = i
  }, [])

  const pickExp = useCallback((i: number) => engineRef.current?.pickExp(i), [])

  return {
    refs,
    inputRef,
    clock,
    section,
    exp,
    pickExp,
    copied,
    copyEmail,
    palette: { open, q, setQ, sel, setSel, filtered, openPalette, closePalette, runCommand },
    nav: { goTop, goSection, openPaletteFromNav, setHover },
  }
}
