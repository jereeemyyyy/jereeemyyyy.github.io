import { useState, type CSSProperties, type RefObject } from 'react'
import { ACCENT, CATEGORIES, ROW_A, ROW_B, iconFor, type CategoryId, type StackItem } from '@/data/site'

const word: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '.4em',
  paddingRight: '.4em',
  fontFamily: "'DM Serif Display',serif",
  fontSize: 'clamp(52px,8.5vw,128px)',
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

const rowBox: CSSProperties = {
  display: 'flex',
  width: 'max-content',
  padding: '20px 0',
  cursor: 'grab',
  userSelect: 'none',
  touchAction: 'pan-y',
  willChange: 'transform',
}

const dot = <span style={{ width: '.12em', height: '.12em', borderRadius: '50%', background: '#333' }} />

/** Tripled so the engine can wrap the marquee at a third of its scroll width. */
const triple = (items: StackItem[]) => [...items, ...items, ...items]

interface StackProps {
  rowARef: RefObject<HTMLDivElement | null>
  rowBRef: RefObject<HTMLDivElement | null>
}

export function Stack({ rowARef, rowBRef }: StackProps) {
  const [hover, setHover] = useState<CategoryId | null>(null)
  const [lock, setLock] = useState<CategoryId | null>(null)
  const cat = lock ?? hover

  return (
    <section id="stack" style={{ padding: 'clamp(120px,18vh,200px) 0' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto 56px',
          padding: '0 clamp(24px,8vw,120px)',
          boxSizing: 'content-box',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 12,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: '#6b6b6b',
        }}
      >
        <span data-reveal="fade" style={{ display: 'flex', gap: 14 }}>
          <span>Stack</span>
        </span>
      </div>

      <div style={{ overflow: 'hidden', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div ref={rowARef} style={rowBox}>
          {triple(ROW_A).map(([name, c], i) => (
            <span
              key={`${name}-${i}`}
              className="stack-word-a"
              style={{
                ...word,
                color: !cat ? '#e0e0e0' : c === cat ? ACCENT : '#262626',
                transition: 'color .35s',
              }}
            >
              <img
                src={iconFor(name)}
                alt=""
                draggable={false}
                style={{
                  width: '.62em',
                  height: '.62em',
                  objectFit: 'contain',
                  flex: 'none',
                  filter: cat && c === cat ? 'none' : 'grayscale(1) brightness(1.8)',
                  opacity: !cat ? 0.9 : c === cat ? 1 : 0.15,
                  transition: 'filter .35s,opacity .35s',
                }}
              />
              {name}
              {dot}
            </span>
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden', borderBottom: '1px solid #1a1a1a' }}>
        <div ref={rowBRef} style={rowBox}>
          {triple(ROW_B).map(([name, c], i) => (
            <span
              key={`${name}-${i}`}
              className="stack-word-b"
              style={{
                ...word,
                color: cat && c === cat ? ACCENT : 'transparent',
                WebkitTextStroke: `1px ${!cat ? '#5a5a5a' : c === cat ? ACCENT : '#262626'}`,
                transition: 'color .35s, -webkit-text-stroke-color .35s',
              }}
            >
              <img
                src={iconFor(name)}
                alt=""
                draggable={false}
                style={{
                  width: '.62em',
                  height: '.62em',
                  objectFit: 'contain',
                  flex: 'none',
                  filter: cat && c === cat ? 'none' : 'grayscale(1) brightness(1.4)',
                  opacity: !cat ? 0.55 : c === cat ? 1 : 0.12,
                  transition: 'filter .35s,opacity .35s',
                }}
              />
              {name}
              {dot}
            </span>
          ))}
        </div>
      </div>

      <div
        onMouseLeave={() => setHover(null)}
        style={{
          maxWidth: 1200,
          margin: '40px auto 0',
          padding: '0 clamp(24px,8vw,120px)',
          boxSizing: 'content-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#4f4f4f', marginRight: 8 }}>
          Filter
        </span>
        {CATEGORIES.map(({ id, name }) => {
          const on = cat === id
          const count = [...ROW_A, ...ROW_B].filter(([, c]) => c === id).length
          return (
            <button
              key={id}
              data-reveal="up"
              onMouseEnter={() => {
                if (!lock) setHover(id)
              }}
              onClick={() => {
                setLock((v) => (v === id ? null : id))
                setHover(null)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                height: 40,
                padding: '0 16px',
                borderRadius: 999,
                border: `1px solid ${on ? ACCENT : '#2a2a2a'}`,
                background: on ? ACCENT : 'rgba(10,10,10,.4)',
                color: on ? '#0a0a0a' : '#a0a0a0',
                font: "500 13px 'Source Code Pro',monospace",
                cursor: 'pointer',
                transition: 'background .25s,color .25s,border-color .25s',
              }}
            >
              {name}
              <span style={{ fontSize: 11, color: on ? '#0a0a0a' : '#5a5a5a' }}>{count}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
