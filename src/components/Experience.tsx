import type { RefObject } from 'react'
import { ACCENT, EXPERIENCES, EXPERIENCE_RANGE } from '@/data/site'

interface ExperienceProps {
  sectionRef: RefObject<HTMLElement | null>
  detailRef: RefObject<HTMLDivElement | null>
  active: number
  onPick: (i: number) => void
}

/**
 * A tall section with a sticky panel: scrolling through it steps the active role,
 * and the four segments underneath read as a progress bar for that scrub.
 */
export function Experience({ sectionRef, detailRef, active, onPick }: ExperienceProps) {
  const cur = EXPERIENCES[active]

  return (
    <section id="experience" ref={sectionRef} style={{ position: 'relative', height: '340vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px clamp(24px,8vw,120px) 40px',
        }}
      >
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          <div
            data-reveal="fade"
            style={{
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
            <span style={{ display: 'flex', gap: 14 }}>
              <span>Experience</span>
            </span>
            <span>{EXPERIENCE_RANGE}</span>
          </div>

          <div
            style={{
              marginTop: 'clamp(28px,6vh,64px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
              gap: 'clamp(32px,6vw,96px)',
              alignItems: 'start',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,1vh,10px)' }}>
              {EXPERIENCES.map((x, i) => {
                const on = i === active
                return (
                  <button
                    key={x.company}
                    onClick={() => onPick(i)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 18,
                      transform: `translateX(${on ? '16px' : '0px'})`,
                      transition: 'transform .6s cubic-bezier(.2,.75,.2,1)',
                    }}
                  >
                    <span
                      style={{
                        flex: 'none',
                        width: 24,
                        fontSize: 12,
                        letterSpacing: '.1em',
                        color: on ? ACCENT : '#4a4a4a',
                        transition: 'color .4s',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: 'clamp(30px,4vw,56px)',
                        lineHeight: 1.08,
                        color: on ? '#f2f2f2' : '#333333',
                        transition: 'color .5s',
                      }}
                    >
                      {x.company}
                    </span>
                  </button>
                )
              })}
            </div>

            <div ref={detailRef} style={{ paddingTop: 8 }}>
              <div style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: ACCENT }}>
                {cur.period}
              </div>
              <h3 style={{ margin: '16px 0 18px', fontSize: 'clamp(19px,1.7vw,23px)', fontWeight: 500, color: '#ffffff' }}>
                {cur.role}
              </h3>
              <p
                style={{
                  margin: '0 0 24px',
                  maxWidth: 520,
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: '#a0a0a0',
                  textWrap: 'pretty',
                }}
              >
                {cur.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cur.tech.map((t) => (
                  <span
                    key={t}
                    style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid #2a2a2a', fontSize: 12, color: '#a0a0a0' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 'clamp(28px,6vh,64px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
              gap: 8,
            }}
          >
            {EXPERIENCES.map((x) => (
              <div key={x.company} style={{ position: 'relative', height: 2, background: '#1f1f1f', overflow: 'hidden' }}>
                <div
                  data-seg
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#e0e0e0',
                    transformOrigin: 'left center',
                    transform: 'scaleX(0)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
