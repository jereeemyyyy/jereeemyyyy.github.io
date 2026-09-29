import type { RefObject } from 'react'
import { ACCENT } from '@/data/site'
import type { Command } from '@/hooks/usePortfolio'

interface CommandPaletteProps {
  open: boolean
  q: string
  sel: number
  commands: Command[]
  inputRef: RefObject<HTMLInputElement | null>
  onQuery: (v: string) => void
  onHover: (i: number) => void
  onRun: (c: Command) => void
  onClose: () => void
}

/** ⌘K / `/` jump menu. */
export function CommandPalette({
  open,
  q,
  sel,
  commands,
  inputRef,
  onQuery,
  onHover,
  onRun,
  onClose,
}: CommandPaletteProps) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(5,5,5,.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '14vh 20px 20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 520,
          borderRadius: 14,
          background: '#151515',
          boxShadow: 'inset 0 0 0 1px #262626, 0 30px 80px rgba(0,0,0,.6)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', height: 54, borderBottom: '1px solid #222' }}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Jump to…"
            style={{
              flex: 1,
              minWidth: 0,
              background: 'transparent',
              border: 0,
              outline: 'none',
              color: '#ffffff',
              font: "400 15px 'Source Code Pro',monospace",
            }}
          />
          <span style={{ fontSize: 11, color: '#6b6b6b', border: '1px solid #2a2a2a', borderRadius: 4, padding: '2px 6px' }}>
            esc
          </span>
        </div>

        <div style={{ padding: 8, maxHeight: 360, overflow: 'auto' }}>
          {commands.map((c, i) => (
            <div
              key={c.tag + c.label}
              onClick={() => onRun(c)}
              onMouseEnter={() => onHover(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '11px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                background: i === sel ? 'rgba(255,255,255,.06)' : 'transparent',
                fontSize: 14,
              }}
            >
              <span style={{ width: 26, fontSize: 11, color: i === sel ? ACCENT : '#5a5a5a' }}>{c.tag}</span>
              <span style={{ flex: 1, color: i === sel ? '#ffffff' : '#bdbdbd' }}>{c.label}</span>
              <span style={{ fontSize: 12, color: '#5a5a5a' }}>{c.hint}</span>
            </div>
          ))}
          {commands.length === 0 && (
            <div style={{ padding: '20px 12px', fontSize: 13, color: '#6b6b6b' }}>Nothing matches "{q}".</div>
          )}
        </div>
      </div>
    </div>
  )
}
