import type { CSSProperties, RefObject } from 'react'
import { ABOUT_FACTS, ABOUT_PARAGRAPHS, STATEMENT } from '@/data/site'
import portrait from '@/assets/me.jpg'

const factLabel: CSSProperties = {
  fontSize: 11,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: '#6b6b6b',
  lineHeight: '21px',
}

function Portrait() {
  return (
    <img
      src={portrait}
      alt="Jeremy Sim"
      loading="lazy"
      decoding="async"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

interface AboutProps {
  stmtRef: RefObject<HTMLParagraphElement | null>
  photoRef: RefObject<HTMLDivElement | null>
}

export function About({ stmtRef, photoRef }: AboutProps) {
  return (
    <section id="about" style={{ padding: 'clamp(120px,18vh,200px) clamp(24px,8vw,120px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          data-reveal="fade"
          style={{ display: 'flex', gap: 14, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6b6b6b' }}
        >
          <span>About</span>
        </div>

        <p
          ref={stmtRef}
          style={{
            margin: '40px 0 0',
            maxWidth: 1100,
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '.25em',
            fontFamily: "'DM Serif Display',serif",
            fontSize: 'clamp(34px,4.6vw,68px)',
            lineHeight: 1.12,
            letterSpacing: '-.01em',
          }}
        >
          {STATEMENT.split(' ').map((w, i) => (
            <span key={`${w}-${i}`} data-w style={{ color: '#2c2c2c', transition: 'color .4s' }}>
              {w}
            </span>
          ))}
        </p>

        <div
          style={{
            marginTop: 'clamp(80px,12vh,140px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
            gap: 'clamp(40px,6vw,96px)',
            alignItems: 'start',
          }}
        >
          <div
            data-reveal="clip"
            style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 4, background: '#141414' }}
          >
            <div ref={photoRef} style={{ position: 'absolute', inset: '-8% 0' }}>
              <Portrait />
            </div>
          </div>

          <div>
            <div
              data-reveal="up"
              style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 15, lineHeight: 1.75, color: '#a0a0a0' }}
            >
              {ABOUT_PARAGRAPHS.map((p) => (
                <p key={p} style={{ margin: 0, textWrap: 'pretty' }}>
                  {p}
                </p>
              ))}
            </div>

            <div style={{ marginTop: 48, borderTop: '1px solid #222' }}>
              {ABOUT_FACTS.map(([label, value]) => (
                <div
                  key={label}
                  data-reveal="left"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px minmax(0,1fr)',
                    gap: 16,
                    padding: '16px 0',
                    borderBottom: '1px solid #1c1c1c',
                    fontSize: 14,
                  }}
                >
                  <span style={factLabel}>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
