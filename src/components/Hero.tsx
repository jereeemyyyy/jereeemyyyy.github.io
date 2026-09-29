import type { RefObject } from 'react'
import { ACCENT } from '@/data/site'

const NAME_WORDS = ['Jeremy', 'Sim']

interface HeroProps {
  clock: string
  scrollLineRef: RefObject<HTMLSpanElement | null>
}

export function Hero({ clock, scrollLineRef }: HeroProps) {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '120px clamp(24px,8vw,120px) 32px',
      }}
    >
      <div
        style={{
          maxWidth: '100%',
          width: 'fit-content',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          textAlign: 'left',
        }}
      >
        <div
          data-par="0.2"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px 28px',
            flexWrap: 'wrap',
            marginBottom: 28,
            fontSize: 12,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: '#6b6b6b',
          }}
        >
          <span>Full stack developer</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>Singapore · {clock}</span>
        </div>

        <h1
          style={{
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '.22em',
            fontFamily: "'DM Serif Display',serif",
            fontWeight: 400,
            fontSize: 'clamp(80px,15.5vw,280px)',
            lineHeight: 0.9,
            letterSpacing: '-.025em',
            color: '#f2f2f2',
            cursor: 'default',
          }}
        >
          {NAME_WORDS.map((word) => (
            <span key={word} style={{ position: 'relative', display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {word.split('').map((ch, i) => (
                <span key={`${word}-${i}`} data-l style={{ display: 'inline-block', willChange: 'transform' }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div
          data-par="0.12"
          style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: 520,
              fontSize: 'clamp(16px,1.5vw,19px)',
              lineHeight: 1.6,
              fontWeight: 300,
              color: '#a0a0a0',
              textWrap: 'pretty',
            }}
          >
            Building things that matter. Currently shipping agentic tools at{' '}
            <span style={{ color: '#e0e0e0', fontWeight: 400 }}>GovTech Singapore</span>.
          </p>
          <span
            style={{
              display: 'flex',
              flex: 'none',
              whiteSpace: 'nowrap',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: '#e0e0e0',
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, animation: 'pulse 2s infinite' }}
            />
            Open to new opportunities
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 'none',
          margin: '48px auto 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          fontSize: 11,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: '#6b6b6b',
        }}
      >
        Scroll
        <span style={{ position: 'relative', width: 1, height: 48, background: '#262626', overflow: 'hidden' }}>
          <span ref={scrollLineRef} style={{ position: 'absolute', inset: 0, background: '#e0e0e0' }} />
        </span>
      </div>
    </section>
  )
}
