import type { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'
import { ACCENT, SECTIONS, type SectionId } from '@/data/site'

const ICONS: Record<SectionId, ReactNode> = {
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  work: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  stack: (
    <>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m14 4-4 16" />
    </>
  ),
  contact: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
}

const item: CSSProperties = {
  position: 'relative',
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  height: 32,
  padding: '0 12px',
  borderRadius: 999,
  whiteSpace: 'nowrap',
}

interface NavProps {
  navRef: RefObject<HTMLElement | null>
  indRef: RefObject<HTMLDivElement | null>
  ringRef: RefObject<SVGSVGElement | null>
  tipRef: RefObject<HTMLDivElement | null>
  cursorRef: RefObject<HTMLDivElement | null>
  onTop: (e: MouseEvent) => void
  onSection: (e: MouseEvent, id: SectionId) => void
  onPalette: (e: MouseEvent) => void
  onHover: (i: number | null) => void
}

/**
 * The nav starts as a centred pill and, as the page scrolls, morphs into either a
 * left rail (wide viewports) or a single progress orb (narrow ones). All of the
 * geometry is driven imperatively by the engine — this only lays out the nodes.
 */
export function Nav({ navRef, indRef, ringRef, tipRef, cursorRef, onTop, onSection, onPalette, onHover }: NavProps) {
  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: 6,
          borderRadius: 999,
          background: 'rgba(22,22,22,.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.07), 0 12px 32px rgba(0,0,0,.4)',
          transform: 'translate(calc(50vw - 50%), 20px)',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <div
          ref={indRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 32,
            width: 0,
            borderRadius: 999,
            background: 'rgba(255,255,255,.09)',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
        <svg
          ref={ringRef}
          width="56"
          height="56"
          viewBox="0 0 56 56"
          style={{ position: 'absolute', left: 0, top: 0, opacity: 0, pointerEvents: 'none', transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="28"
            cy="28"
            r="26.5"
            fill="none"
            stroke={ACCENT}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="166.5"
            strokeDashoffset="166.5"
          />
        </svg>

        <a
          data-ni="0"
          data-label="Back to top"
          href="#top"
          onClick={onTop}
          onMouseEnter={() => onHover(0)}
          onMouseLeave={() => onHover(null)}
          style={{ ...item, color: '#e0e0e0' }}
        >
          <span data-nnum style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 8, height: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }} />
          </span>
          <span data-nlab style={{ display: 'inline-block', overflow: 'hidden', marginLeft: 8 }}>
            Jeremy Sim
          </span>
        </a>

        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            data-ni={s.num}
            data-label={s.label}
            href={`#${s.id}`}
            onClick={(e) => onSection(e, s.id)}
            onMouseEnter={() => onHover(i + 1)}
            onMouseLeave={() => onHover(null)}
            style={{ ...item, color: '#8a8a8a' }}
          >
            <span data-nnum style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[s.id]}
              </svg>
            </span>
            <span data-nlab style={{ display: 'inline-block', overflow: 'hidden', marginLeft: 8 }}>
              {s.label}
            </span>
          </a>
        ))}

        <button
          data-ni="k"
          data-label="Command menu"
          onClick={onPalette}
          onMouseEnter={() => onHover(SECTIONS.length + 1)}
          onMouseLeave={() => onHover(null)}
          style={{
            ...item,
            border: 0,
            background: 'transparent',
            color: '#8a8a8a',
            font: "500 13px 'Source Code Pro',monospace",
            cursor: 'pointer',
          }}
        >
          <span data-nnum style={{ fontSize: 11 }}>
            ⌘K
          </span>
        </button>
      </nav>

      <div
        ref={tipRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 51,
          pointerEvents: 'none',
          padding: '6px 12px',
          borderRadius: 999,
          background: '#f2f2f2',
          color: '#0a0a0a',
          fontSize: 12,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity .2s',
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 200,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#ffffff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />
    </>
  )
}
