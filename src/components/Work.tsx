import type { MouseEvent, RefObject } from 'react'
import { ACCENT, GITHUB, GITHUB_HANDLE, PROJECTS } from '@/data/site'

const tilt = (e: MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`
  el.style.setProperty('--mx', x * 100 + '%')
  el.style.setProperty('--my', y * 100 + '%')
  el.style.setProperty('--spot', '1')
}

const untilt = (e: MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget
  el.style.transform = ''
  el.style.setProperty('--spot', '0')
}

interface WorkProps {
  sectionRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLDivElement | null>
  countRef: RefObject<HTMLSpanElement | null>
  barRef: RefObject<HTMLDivElement | null>
}

/** Vertical scroll over this tall section is translated into horizontal travel of the card track. */
export function Work({ sectionRef, trackRef, countRef, barRef }: WorkProps) {
  return (
    <section id="work" ref={sectionRef} style={{ position: 'relative', height: '300vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 0 24px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto clamp(20px,4vh,44px)',
            padding: '0 clamp(24px,8vw,120px)',
            boxSizing: 'content-box',
          }}
        >
          <div
            data-reveal="fade"
            style={{ display: 'flex', gap: 14, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6b6b6b' }}
          >
            <span>Work</span>
          </div>
          <h2
            data-reveal="rise"
            style={{
              margin: '14px 0 0',
              fontFamily: "'DM Serif Display',serif",
              fontWeight: 400,
              fontSize: 'clamp(40px,min(6vw,8vh),80px)',
              lineHeight: 1,
              color: '#f2f2f2',
            }}
          >
            Selected work
          </h2>
        </div>

        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 48,
            width: 'max-content',
            padding: '0 max(clamp(24px,8vw,120px), calc((100vw - 1200px) / 2))',
            willChange: 'transform',
          }}
        >
          {PROJECTS.map((p, i) => (
            <div key={p.title} data-reveal="cardx" style={{ flex: 'none', width: 'min(440px,80vw,62vh)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 10,
                  fontSize: 11,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: '#6b6b6b',
                }}
              >
                <span style={{ color: '#e0e0e0' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{p.type}</span>
                <span style={{ marginLeft: 'auto' }}>{p.year}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'DM Serif Display',serif",
                    fontWeight: 400,
                    fontSize: 'clamp(32px,3.4vw,44px)',
                    lineHeight: 1.05,
                    color: '#f2f2f2',
                  }}
                >
                  {p.title}
                </h3>
                {p.award && (
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: ACCENT,
                      color: '#0a0a0a',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '.04em',
                    }}
                  >
                    {p.award}
                  </span>
                )}
              </div>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={tilt}
                onMouseLeave={untilt}
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: p.color,
                  transition: 'transform .3s ease-out',
                  willChange: 'transform',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      'radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(255,255,255,.22), transparent 60%)',
                    opacity: 'var(--spot,0)',
                    transition: 'opacity .3s',
                    zIndex: 2,
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(14px,2.4vh,24px) 24px clamp(12px,1.8vh,18px)' }}>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: '28rem',
                      minHeight: '4.8em',
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,.92)',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4,
                      overflow: 'hidden',
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
                <div style={{ position: 'relative', zIndex: 1, padding: '0 16px' }}>
                  <div
                    style={{
                      height: 'clamp(140px,26vh,270px)',
                      borderRadius: '8px 8px 0 0',
                      overflow: 'hidden',
                      background: 'rgba(0,0,0,.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {p.image ? (
                      <img
                        data-imgpar
                        src={p.image}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,.5)',
                        }}
                      >
                        Screenshot soon
                      </span>
                    )}
                  </div>
                </div>
              </a>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 'clamp(10px,2vh,18px)',
                  maxHeight: 28,
                  overflow: 'hidden',
                }}
              >
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 999,
                      border: '1px solid #262626',
                      fontSize: 11,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: '#8a8a8a',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <a
            data-reveal="cardx"
            className="ghost-card"
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 'none',
              width: 'min(300px,70vw)',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 16,
              padding: 32,
              borderRadius: 14,
              border: '1px solid #222',
              color: '#e0e0e0',
            }}
          >
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, lineHeight: 1.05 }}>More on GitHub →</span>
            <span style={{ fontSize: 13, color: '#6b6b6b' }}>{GITHUB_HANDLE}</span>
          </a>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: 'clamp(14px,3vh,32px) auto 0',
            padding: '0 clamp(24px,8vw,120px)',
            boxSizing: 'content-box',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 12,
            letterSpacing: '.14em',
            color: '#6b6b6b',
          }}
        >
          <span ref={countRef} style={{ color: '#e0e0e0', fontVariantNumeric: 'tabular-nums' }}>
            01
          </span>
          <div style={{ flex: 1, height: 1, background: '#1f1f1f', position: 'relative', overflow: 'hidden' }}>
            <div ref={barRef} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 0, background: '#e0e0e0' }} />
          </div>
          <span>{String(PROJECTS.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}
