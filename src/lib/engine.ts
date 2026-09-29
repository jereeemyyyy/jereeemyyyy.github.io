import type { RefObject } from 'react'
import { clamp, ease, lerp, prefersReducedMotion } from './anim'
import { EXPERIENCES, PROJECTS, SECTIONS, SETTINGS } from '@/data/site'

type Maybe<T> = RefObject<T | null>

export interface EngineRefs {
  nav: Maybe<HTMLElement>
  ind: Maybe<HTMLDivElement>
  ring: Maybe<SVGSVGElement>
  tip: Maybe<HTMLDivElement>
  cursor: Maybe<HTMLDivElement>
  scrollLine: Maybe<HTMLSpanElement>
  stmt: Maybe<HTMLParagraphElement>
  photo: Maybe<HTMLDivElement>
  expSec: Maybe<HTMLElement>
  detail: Maybe<HTMLDivElement>
  hsec: Maybe<HTMLElement>
  track: Maybe<HTMLDivElement>
  hCount: Maybe<HTMLSpanElement>
  hBar: Maybe<HTMLDivElement>
  rowA: Maybe<HTMLDivElement>
  rowB: Maybe<HTMLDivElement>
  canvas: Maybe<HTMLCanvasElement>
}

export interface EngineHost {
  getSection: () => number
  setSection: (i: number) => void
  getExp: () => number
  setExp: (i: number) => void
}

export type NavMode = 'rail' | 'orb' | 'top'

interface Star {
  x: number
  y: number
  z: number
  tw: number
}

interface Shooter {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

interface NavMetric {
  el: HTMLElement
  lab: HTMLElement | null
  numW: number
  labW: number
  label: string
}

interface NavLayout {
  pad: number
  gap: number
  lab: number
  w: number
  hx: number
  x: number
  y: number
}

interface Letter {
  el: HTMLElement
  i: number
  r: number
  h: number
}

interface MarqueeRow {
  el: HTMLElement
  x: number
  dir: number
  fling: number
  drag: { sx: number; x0: number; lx: number } | null
}

interface RevealState {
  to: Record<string, string>
  transition: string
  shown: boolean
}

const REVEAL_EASE = 'cubic-bezier(.2,.75,.2,1)'

const REVEAL_FROM: Record<string, Record<string, string>> = {
  rise: { opacity: '0', transform: 'translateY(.3em)', clipPath: 'inset(0 0 100% 0)' },
  fade: { opacity: '0' },
  clip: { clipPath: 'inset(100% 0 0 0)' },
  up: { opacity: '0', transform: 'translateY(36px)' },
  left: { opacity: '0', transform: 'translateX(-24px)' },
  cardx: {
    opacity: '0',
    transform: 'perspective(1100px) translateX(90px) rotateY(-14deg)',
    transformOrigin: 'left center',
  },
}

const REVEAL_TO: Record<string, Record<string, string>> = {
  rise: { opacity: '1', transform: 'none', clipPath: 'inset(0 0 -30% 0)' },
  clip: { clipPath: 'inset(0 0 0 0)' },
}

/**
 * All of the imperative, frame-driven behaviour of the portfolio: the starfield,
 * the morphing nav, the magnetic hero letters, the custom cursor, the draggable
 * stack marquees, the horizontally scrolling work track and the scroll reveals.
 *
 * It owns nothing React renders — it only mutates styles on nodes React has
 * already mounted, and calls back into the host for the two pieces of state that
 * do drive rendering (active section, active experience).
 */
export class PortfolioEngine {
  private refs: EngineRefs
  private host: EngineHost

  /* pointer / scroll */
  private mx = -9999
  private my = -9999
  private vel = 0
  private dir = 1
  private lastY: number | null = null
  private fine = true
  private cursorOn = false
  private hot = false
  private cx: number | null = null
  private cy: number | null = null
  private cs = 10

  /* starfield */
  private ctx: CanvasRenderingContext2D | null = null
  private stars: Star[] = []
  private shooter: Shooter | null = null
  private sw = 0
  private sh = 0

  /* nav */
  mode: NavMode = 'rail'
  private navEls: HTMLElement[] = []
  private navMetrics: NavMetric[] = []
  private navFullW = 0
  private navP = 0
  private indI: number | null = null
  private indO = 0
  hoverI: number | null = null
  private flashUntil = 0

  /* hero letters */
  private letters: Letter[] = []

  /* marquee */
  private rows: MarqueeRow[] = []
  private marqueeAbort = new AbortController()

  /* horizontal work */
  private hDist: number | null = null
  private hX = 0
  private hActive = false
  private sk = 0
  private imgEls: HTMLElement[] | null = null

  /* about statement */
  private words: HTMLElement[] = []
  private lit = -1

  /* experience segments */
  private segs: HTMLElement[] = []

  /* hero parallax */
  private parEls: HTMLElement[] | null = null

  /* reveals */
  private reveals = new WeakMap<HTMLElement, RevealState>()
  private revIO: IntersectionObserver | null = null
  private revSweep: ReturnType<typeof setInterval> | null = null
  private revSafety: ReturnType<typeof setTimeout> | null = null

  /* lifecycle */
  private t0 = 0
  private raf = 0
  private fallback: ReturnType<typeof setInterval> | null = null
  private lastFrame = 0
  private hRO: ResizeObserver | null = null
  private onMove!: (e: PointerEvent) => void
  private onOver!: (e: PointerEvent) => void
  private onOut!: (e: PointerEvent) => void
  private onScroll!: () => void
  private onResize!: () => void
  private sizeStars!: () => void

  constructor(refs: EngineRefs, host: EngineHost) {
    this.refs = refs
    this.host = host
  }

  /* ──────────────────────────────────────────────── lifecycle */

  mount() {
    this.t0 = performance.now()
    this.fine = !window.matchMedia || matchMedia('(pointer:fine)').matches

    this.onMove = (e) => {
      this.mx = e.clientX
      this.my = e.clientY
      this.cursorOn = true
    }
    this.onOver = (e) => {
      const t = e.target as Element | null
      this.hot = !!(t && t.closest && t.closest('a,button,[data-hot]'))
    }
    this.onOut = (e) => {
      if (!e.relatedTarget) this.cursorOn = false
    }
    this.onScroll = () => this.scrollFx()
    this.onResize = () => {
      this.measureNav()
      this.sizeH()
      this.scrollFx()
    }

    window.addEventListener('pointermove', this.onMove)
    document.addEventListener('pointerover', this.onOver)
    document.addEventListener('pointerout', this.onOut)
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onResize)

    this.initStars()
    this.setupNav()
    this.initReveals()
    this.setupMarquee()
    this.sizeH()
    this.scrollFx()

    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.measureNav()
        this.sizeH()
        this.scrollFx()
      })
    }

    const sl = this.refs.scrollLine.current
    if (sl && sl.animate) {
      sl.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(100%)' }], {
        duration: 1800,
        iterations: Infinity,
        easing: 'cubic-bezier(.6,0,.2,1)',
      })
    }

    const frame = (t: number) => {
      this.lastFrame = performance.now()
      this.tick(t)
    }
    const loop = (t: number) => {
      frame(t)
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
    // Some browsers throttle rAF hard when the tab is partly occluded; this keeps
    // scroll-linked layout honest in that case.
    this.fallback = setInterval(() => {
      if (performance.now() - this.lastFrame > 200) frame(performance.now())
    }, 33)
  }

  unmount() {
    cancelAnimationFrame(this.raf)
    if (this.fallback) clearInterval(this.fallback)
    if (this.revSweep) clearInterval(this.revSweep)
    if (this.revSafety) clearTimeout(this.revSafety)
    window.removeEventListener('pointermove', this.onMove)
    document.removeEventListener('pointerover', this.onOver)
    document.removeEventListener('pointerout', this.onOut)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    if (this.sizeStars) window.removeEventListener('resize', this.sizeStars)
    this.marqueeAbort.abort()
    this.revIO?.disconnect()
    this.hRO?.disconnect()
  }

  private tick(t: number) {
    const y = window.scrollY
    const dy = y - (this.lastY ?? y)
    this.lastY = y
    this.vel = lerp(this.vel, dy, 0.2)
    if (Math.abs(dy) > 0.5) this.dir = Math.sign(dy)
    this.drawStars(t)
    this.updateNav()
    this.updateLetters(t)
    this.updateCursor()
    this.updateMarquee()
    this.updateTrack()
  }

  /* ──────────────────────────────────────────────── navigation */

  go(id: string) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })
  }

  /** In orb mode the collapsed nav is a single button: tapping it opens the palette. */
  navAct(e: { preventDefault: () => void } | undefined, fn: () => void, openPalette: () => void) {
    e?.preventDefault()
    if (this.mode === 'orb' && this.navP > 0.5) {
      openPalette()
      return
    }
    fn()
  }

  flashSection() {
    this.flashUntil = performance.now() + 1400
  }

  animateDetail() {
    const d = this.refs.detail.current
    if (!d || !d.animate) return
    d.animate(
      [
        { opacity: 0, transform: 'translateY(18px)', filter: 'blur(6px)' },
        { opacity: 1, transform: 'none', filter: 'blur(0)' },
      ],
      { duration: 560, easing: 'cubic-bezier(.2,.75,.2,1)' },
    )
  }

  private setupNav() {
    const nav = this.refs.nav.current
    if (!nav) return
    this.navEls = [...nav.querySelectorAll<HTMLElement>('[data-ni]')]
    this.measureNav()
    nav.style.display = 'block'
    nav.style.padding = '0'
    this.navEls.forEach((el) => {
      el.style.position = 'absolute'
      el.style.left = '0'
      el.style.top = '0'
      el.style.padding = '0'
    })
  }

  private measureNav() {
    if (!this.navEls.length) return
    this.navMetrics = this.navEls.map((el) => {
      const num = el.querySelector<HTMLElement>('[data-nnum]')
      const lab = el.querySelector<HTMLElement>('[data-nlab]')
      return {
        el,
        lab,
        numW: num ? num.offsetWidth : 0,
        labW: lab ? lab.scrollWidth : 0,
        label: el.getAttribute('data-label') || '',
      }
    })
    this.navFullW = this.navMetrics.reduce((s, it) => s + 24 + it.numW + (it.labW ? 8 + it.labW : 0) + 2, 10)
  }

  private updateNav() {
    const nav = this.refs.nav.current
    const items = this.navMetrics
    if (!nav || !items.length) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const m = SETTINGS.navMode
    const mode: NavMode = (this.mode = m === 'auto' ? (vw >= 1000 ? 'rail' : 'orb') : m)

    const raw = mode === 'top' ? 0 : clamp((window.scrollY - 40) / 420)
    this.navP = Math.abs(raw - this.navP) < 0.001 ? raw : lerp(this.navP, raw, 0.16)

    const p = this.navP
    const qMin = this.navFullW > vw - 32 ? 1 : 0
    const q = Math.max(qMin, clamp(p * 1.6))
    const tt = ease(clamp((p - 0.1) / 0.9))

    const S = 32
    const G = 4
    const P = 6
    const n = items.length
    const orb = mode === 'orb'
    const active = this.host.getSection() + 1

    let x = P
    const L: NavLayout[] = items.map((it) => {
      const pad = lerp(12, (S - it.numW) / 2, q)
      const gap = it.labW ? lerp(8, 0, q) : 0
      const lab = it.labW * (1 - q)
      const o: NavLayout = { pad, gap, lab, w: 2 * pad + it.numW + gap + lab, hx: x, x: 0, y: 0 }
      x += o.w + 2
      return o
    })

    const Wh = x - 2 + P
    const Hh = S + 2 * P
    let Wt: number
    let Ht: number
    let cxT: number
    let cyT: number
    if (orb) {
      Wt = Ht = 56
      cxT = vw - 24 - 28
      cyT = vh - 24 - 28
    } else {
      Wt = S + 2 * P
      Ht = 2 * P + n * S + (n - 1) * G
      cxT = 24 + Wt / 2
      cyT = vh / 2
    }

    const W = lerp(Wh, Wt, tt)
    const H = lerp(Hh, Ht, tt)
    const left = lerp(vw / 2, cxT, tt) - W / 2
    const top = lerp(20 + Hh / 2, cyT, tt) - H / 2
    nav.style.width = W + 'px'
    nav.style.height = H + 'px'
    nav.style.transform = `translate3d(${left}px,${top}px,0)`

    L.forEach((o, i) => {
      const it = items[i]
      const s = it.el.style
      o.x = lerp(o.hx, (Wt - o.w) / 2, tt)
      o.y = lerp(P, orb ? (56 - S) / 2 : P + i * (S + G), tt)
      s.transform = `translate3d(${o.x}px,${o.y}px,0)`
      s.width = o.w + 'px'
      s.height = S + 'px'
      s.paddingLeft = o.pad + 'px'
      if (it.lab) {
        it.lab.style.maxWidth = o.lab + 'px'
        it.lab.style.marginLeft = o.gap + 'px'
        it.lab.style.opacity = String(clamp(1 - q * 1.5))
      }
      s.opacity = String(orb && i !== active ? 1 - tt : 1)
      s.color = i === active && i > 0 ? '#ffffff' : i === 0 ? '#e0e0e0' : '#8a8a8a'
    })

    const ind = this.refs.ind.current
    if (ind) {
      const ai = Math.max(1, active)
      this.indI = this.indI == null ? ai : lerp(this.indI, ai, 0.2)
      this.indO = lerp(this.indO, active > 0 ? 1 : 0, 0.15)
      const i0 = Math.floor(this.indI)
      const i1 = Math.min(n - 1, i0 + 1)
      const f = this.indI - i0
      const a = L[i0]
      const b = L[i1]
      if (a && b) {
        ind.style.transform = `translate3d(${lerp(a.x, b.x, f)}px,${lerp(a.y, b.y, f)}px,0)`
        ind.style.width = lerp(a.w, b.w, f) + 'px'
        ind.style.opacity = String(this.indO * (orb ? 1 - tt : 1))
      }
    }

    const ring = this.refs.ring.current
    if (ring) {
      ring.style.opacity = String(orb ? tt : 0)
      const h = document.documentElement.scrollHeight - vh
      const c = ring.firstElementChild
      if (c) c.setAttribute('stroke-dashoffset', (166.5 * (1 - (h > 0 ? window.scrollY / h : 0))).toFixed(1))
    }

    const tip = this.refs.tip.current
    if (tip) {
      const i = this.hoverI != null ? this.hoverI : active
      const show =
        mode === 'rail' &&
        tt > 0.85 &&
        !!L[i] &&
        (this.hoverI != null || (active > 0 && performance.now() < this.flashUntil))
      if (show) {
        const txt = items[i].label
        if (tip.textContent !== txt) tip.textContent = txt
        tip.style.transform = `translate3d(${left + W + 10}px,${top + L[i].y + S / 2}px,0) translateY(-50%)`
        tip.style.opacity = '1'
      } else {
        tip.style.opacity = '0'
      }
    }
  }

  /* ──────────────────────────────────────────────── starfield */

  private initStars() {
    const c = this.refs.canvas.current
    if (!c) return
    this.ctx = c.getContext('2d')
    this.sizeStars = () => {
      const dpr = window.devicePixelRatio || 1
      this.sw = window.innerWidth
      this.sh = window.innerHeight
      c.width = this.sw * dpr
      c.height = this.sh * dpr
      c.style.width = this.sw + 'px'
      c.style.height = this.sh + 'px'
      this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    this.sizeStars()
    window.addEventListener('resize', this.sizeStars)
    this.makeStars()
  }

  private makeStars() {
    this.stars = Array.from({ length: SETTINGS.starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() ** 2 * 0.9 + 0.1,
      tw: Math.random() * 6.28,
    }))
  }

  private drawStars(t: number) {
    const ctx = this.ctx
    if (!ctx || !this.stars.length) return
    const W = this.sw
    const H = this.sh
    const sy = window.scrollY
    ctx.clearRect(0, 0, W, H)

    const px = this.mx > -999 ? this.mx / W - 0.5 : 0
    const py = this.my > -999 ? this.my / H - 0.5 : 0
    const near: { x: number; y: number; d: number }[] = []
    const R = 160
    const con = SETTINGS.constellation && this.fine

    for (const s of this.stars) {
      const x = (((s.x * W - px * 40 * s.z) % W) + W) % W
      const y = (((s.y * H - sy * 0.25 * s.z - py * 40 * s.z) % H) + H) % H
      ctx.fillStyle = `rgba(255,255,255,${(0.25 + 0.75 * s.z) * (0.65 + 0.35 * Math.sin(t * 0.0015 + s.tw))})`
      ctx.beginPath()
      ctx.arc(x, y, s.z * 1.5 + 0.25, 0, 6.283)
      ctx.fill()
      if (con) {
        const d = Math.hypot(x - this.mx, y - this.my)
        if (d < R) near.push({ x, y, d })
      }
    }

    if (con && near.length) {
      ctx.lineWidth = 0.6
      for (let i = 0; i < near.length; i++) {
        const p = near[i]
        ctx.strokeStyle = `rgba(255,255,255,${(1 - p.d / R) * 0.3})`
        ctx.beginPath()
        ctx.moveTo(this.mx, this.my)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        for (let j = i + 1; j < near.length; j++) {
          const qq = near[j]
          const dd = Math.hypot(p.x - qq.x, p.y - qq.y)
          if (dd < 70) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dd / 70) * 0.15})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(qq.x, qq.y)
            ctx.stroke()
          }
        }
      }
    }

    if (!this.shooter && Math.random() < 0.004) {
      this.shooter = {
        x: Math.random() * W,
        y: Math.random() * H * 0.5,
        vx: 6 + Math.random() * 4,
        vy: 2 + Math.random() * 2,
        life: 1,
      }
    }
    const s = this.shooter
    if (s) {
      const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14)
      g.addColorStop(0, `rgba(255,255,255,${0.8 * s.life})`)
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.strokeStyle = g
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14)
      ctx.stroke()
      s.x += s.vx
      s.y += s.vy
      s.life -= 0.015
      if (s.life <= 0 || s.x > W + 200) this.shooter = null
    }
  }

  /* ──────────────────────────────────────────────── hero letters */

  private updateLetters(t: number) {
    if (!this.letters.length || !this.letters[0].el.isConnected) {
      this.letters = [...document.querySelectorAll<HTMLElement>('[data-l]')].map((el, i) => ({
        el,
        i,
        r: ((i * 9301 + 49297) % 233280) / 233280,
        h: 0,
      }))
    }
    const y = window.scrollY
    const vh = window.innerHeight
    const intro = t - this.t0
    if (y > vh * 1.4 && intro > 3000) return

    const mag = SETTINGS.magneticName && this.fine && this.mx > -999
    const s = y / vh

    for (const L of this.letters) {
      const k = clamp((intro - 100 - L.i * 60) / 900)
      const e = 1 - Math.pow(1 - k, 4)
      let lift = 0
      const hgt = L.el.offsetHeight
      if (mag && L.el.parentElement) {
        const w = L.el.parentElement.getBoundingClientRect()
        const d = Math.hypot(
          this.mx - (w.left + L.el.offsetLeft + L.el.offsetWidth / 2),
          this.my - (w.top + w.height / 2),
        )
        const f = clamp(1 - d / 240)
        lift = f * f * 0.2 * hgt
      }
      L.h = lerp(L.h, lift, 0.14)
      const ty = (1 - e) * 0.45 * hgt - y * (0.12 + 0.38 * L.r) - L.h
      L.el.style.transform = `translate3d(0,${ty.toFixed(2)}px,0) rotate(${(s * (L.r - 0.5) * 28).toFixed(2)}deg)`
      L.el.style.opacity = (e * clamp(1 - s * 1.1)).toFixed(3)
    }
  }

  /* ──────────────────────────────────────────────── cursor */

  private updateCursor() {
    const c = this.refs.cursor.current
    if (!c) return
    if (!(SETTINGS.customCursor && this.fine && this.cursorOn)) {
      c.style.opacity = '0'
      return
    }
    this.cx = this.cx == null ? this.mx : lerp(this.cx, this.mx, 0.28)
    this.cy = this.cy == null ? this.my : lerp(this.cy, this.my, 0.28)
    this.cs = lerp(this.cs, this.hot ? 44 : 10, 0.2)
    c.style.opacity = '1'
    c.style.width = c.style.height = this.cs + 'px'
    c.style.transform = `translate3d(${this.cx - this.cs / 2}px,${this.cy - this.cs / 2}px,0)`
  }

  /* ──────────────────────────────────────────────── stack marquee */

  private setupMarquee() {
    this.rows = [this.refs.rowA.current, this.refs.rowB.current]
      .filter((el): el is HTMLDivElement => !!el)
      .map((el, i) => ({ el, x: 0, dir: i === 0 ? -1 : 1, fling: 0, drag: null }))

    const { signal } = this.marqueeAbort
    this.rows.forEach((r) => {
      r.el.addEventListener('pointerdown', (e) => {
        r.drag = { sx: e.clientX, x0: r.x, lx: e.clientX }
        r.el.style.cursor = 'grabbing'
        try {
          r.el.setPointerCapture(e.pointerId)
        } catch {
          /* pointer capture is best-effort */
        }
        e.preventDefault()
      }, { signal })
      r.el.addEventListener('pointermove', (e) => {
        if (!r.drag) return
        r.x = r.drag.x0 + (e.clientX - r.drag.sx)
        r.fling = e.clientX - r.drag.lx
        r.drag.lx = e.clientX
      }, { signal })
      const up = () => {
        if (!r.drag) return
        r.drag = null
        r.el.style.cursor = 'grab'
      }
      r.el.addEventListener('pointerup', up, { signal })
      r.el.addEventListener('pointercancel', up, { signal })
    })
  }

  private updateMarquee() {
    if (!this.rows.length) return
    const v = Math.min(Math.abs(this.vel), 60)
    this.rows.forEach((r) => {
      if (!r.drag) {
        r.x += r.dir * this.dir * (0.6 + v * 0.35) + r.fling
        r.fling *= 0.94
      }
      const W = r.el.scrollWidth / 3
      if (W > 0) r.x = (((r.x % W) + W) % W) - W
      r.el.style.transform = `translate3d(${r.x.toFixed(2)}px,0,0)`
    })
  }

  /* ──────────────────────────────────────────────── horizontal work */

  private sizeH() {
    const sec = this.refs.hsec.current
    const tr = this.refs.track.current
    if (!sec || !tr) return
    if (!window.innerHeight || !tr.scrollWidth) {
      this.hDist = null
      return
    }
    if (!this.hRO && window.ResizeObserver) {
      this.hRO = new ResizeObserver(() => {
        this.sizeH()
        this.hScroll()
      })
      this.hRO.observe(tr)
    }
    this.hDist = Math.max(0, tr.scrollWidth - window.innerWidth)
    const h = window.innerHeight + this.hDist + 'px'
    if (sec.style.height !== h) sec.style.height = h
  }

  private hScroll() {
    const sec = this.refs.hsec.current
    if (!sec) return
    if (!this.hDist) this.sizeH()
    const d = this.hDist || 1
    const top = sec.getBoundingClientRect().top
    const p = clamp(-top / d)
    this.hX = p * (this.hDist || 0)
    this.hActive = top < 0 && p < 1
    if (this.refs.hBar.current) this.refs.hBar.current.style.width = p * 100 + '%'
    if (this.refs.hCount.current) {
      const n = PROJECTS.length
      this.refs.hCount.current.textContent = String(Math.min(n, 1 + Math.floor(p * (n - 0.01)))).padStart(2, '0')
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    if (!this.imgEls) this.imgEls = [...document.querySelectorAll<HTMLElement>('[data-imgpar]')]
    this.imgEls.forEach((img) => {
      const parent = img.parentElement
      if (!parent) return
      const r = parent.getBoundingClientRect()
      if (r.right < 0 || r.left > vw || r.bottom < 0 || r.top > vh) return
      img.style.transform = `scale(1.16) translate3d(${(((r.left + r.width / 2 - vw / 2) / vw) * -6).toFixed(2)}%,0,0)`
    })
  }

  private updateTrack() {
    const tr = this.refs.track.current
    if (!tr) return
    this.sk = lerp(this.sk, this.hActive ? clamp(-this.vel * 0.12, -5, 5) : 0, 0.15)
    tr.style.transform = `translate3d(${-this.hX}px,0,0) skewX(${this.sk.toFixed(2)}deg)`
  }

  /* ──────────────────────────────────────────────── scroll-linked */

  private scrollFx() {
    const vh = window.innerHeight
    const y = window.scrollY

    let s = -1
    SECTIONS.forEach(({ id }, i) => {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top < vh * 0.5) s = i
    })
    if (s !== this.host.getSection()) this.host.setSection(s)

    const st = this.refs.stmt.current
    if (st) {
      if (!this.words.length) this.words = [...st.querySelectorAll<HTMLElement>('[data-w]')]
      const r = st.getBoundingClientRect()
      const lit = Math.round(clamp((vh * 0.8 - r.top) / (r.height + vh * 0.2)) * this.words.length)
      if (lit !== this.lit) {
        this.words.forEach((w, i) => {
          w.style.color = i < lit ? '#f2f2f2' : '#2c2c2c'
        })
        this.lit = lit
      }
    }

    const ex = this.refs.expSec.current
    if (ex) {
      const r = ex.getBoundingClientRect()
      const d = r.height - vh
      const pr = d > 0 ? clamp(-r.top / d) : 0
      const idx = Math.min(EXPERIENCES.length - 1, Math.floor(pr * EXPERIENCES.length))
      if (idx !== this.host.getExp()) this.host.setExp(idx)
      if (!this.segs.length) this.segs = [...ex.querySelectorAll<HTMLElement>('[data-seg]')]
      this.segs.forEach((g, i) => {
        g.style.transform = `scaleX(${clamp(pr * EXPERIENCES.length - i)})`
      })
    }

    if (!this.parEls) this.parEls = [...document.querySelectorAll<HTMLElement>('[data-par]')]
    if (y < vh * 1.3) {
      this.parEls.forEach((el) => {
        el.style.transform = `translate3d(0,${y * (parseFloat(el.getAttribute('data-par') || '0') || 0)}px,0)`
        el.style.opacity = String(clamp(1 - y / (vh * 0.6)))
      })
    }

    const ph = this.refs.photo.current
    if (ph && ph.parentElement) {
      const r = ph.parentElement.getBoundingClientRect()
      if (r.bottom > 0 && r.top < vh) {
        ph.style.transform = `translate3d(0,${(((r.top + r.height / 2 - vh / 2) / vh) * -10).toFixed(2)}%,0)`
      }
    }

    this.hScroll()
  }

  /** Jump the page so the sticky experience panel lands on entry `i`. */
  pickExp(i: number) {
    const ex = this.refs.expSec.current
    if (!ex) return
    const d = ex.offsetHeight - window.innerHeight
    window.scrollTo({
      top: ex.getBoundingClientRect().top + window.scrollY + (d * (i + 0.5)) / EXPERIENCES.length,
      behavior: 'smooth',
    })
  }

  /* ──────────────────────────────────────────────── reveals */

  private initReveals() {
    if (prefersReducedMotion()) return
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]

    els.forEach((el) => {
      const k = el.getAttribute('data-reveal') || ''
      const from = REVEAL_FROM[k]
      if (!from) return
      const prev = el.style.transition
      const to =
        REVEAL_TO[k] ||
        Object.fromEntries(
          Object.keys(from)
            .filter((p) => p !== 'transformOrigin')
            .map((p) => [p, p === 'opacity' ? '1' : 'none']),
        )
      Object.assign(el.style, from)
      const dur = k === 'clip' ? 1.2 : k === 'cardx' ? 1 : 0.85
      const transition =
        ['opacity', 'transform', 'clip-path'].map((p) => `${p} ${dur}s ${REVEAL_EASE}`).join(', ') +
        (prev ? ', ' + prev : '')
      this.reveals.set(el, { to, transition, shown: false })
    })

    const reveal = (el: HTMLElement, i: number) => {
      const st = this.reveals.get(el)
      if (!st || st.shown) return
      st.shown = true
      this.revIO?.unobserve(el)
      const d = i * 80
      el.style.transition = st.transition
      el.style.transitionDelay = d + 'ms'
      void el.offsetWidth
      Object.assign(el.style, st.to)
      setTimeout(() => {
        el.style.transitionDelay = '0ms'
      }, d + 1300)
    }

    this.revIO = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
          .forEach((e, i) => reveal(e.target as HTMLElement, i))
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => this.revIO?.observe(el))

    // The horizontal track and sticky sections can sit outside the observer's
    // idea of "visible", so sweep for anything on screen that never fired.
    const sweep = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      let i = 0
      els.forEach((el) => {
        const st = this.reveals.get(el)
        if (!st || st.shown) return
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.95 && r.bottom > 0 && r.left < vw * 0.95 && r.right > 0) reveal(el, i++)
      })
    }
    this.revSweep = setInterval(sweep, 400)
    this.revSafety = setTimeout(() => {
      if (!els.some((el) => this.reveals.get(el)?.shown)) els.forEach((el) => reveal(el, 0))
    }, 2500)
  }
}
