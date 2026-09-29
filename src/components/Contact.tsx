import type { CSSProperties, MouseEvent } from 'react'
import { ACCENT, EMAIL, GITHUB, LINKEDIN } from '@/data/site'

const magMove = (e: MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left - r.width / 2
  const y = e.clientY - r.top - r.height / 2
  el.style.transform = `translate(${x * 0.35}px,${y * 0.35}px)`
  const inner = el.firstElementChild as HTMLElement | null
  if (inner) inner.style.transform = `translate(${x * 0.15}px,${y * 0.15}px)`
}

const magLeave = (e: MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget
  el.style.transform = ''
  const inner = el.firstElementChild as HTMLElement | null
  if (inner) inner.style.transform = ''
}

const social: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '50%',
  border: '1px solid #2a2a2a',
  background: 'rgba(10,10,10,.4)',
  color: '#e0e0e0',
  cursor: 'pointer',
  transition: 'background .25s,color .25s,border-color .25s,transform .25s',
}

interface ContactProps {
  clock: string
  copied: boolean
  onCopy: () => void
}

export function Contact({ clock, copied, onCopy }: ContactProps) {
  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(120px,18vh,200px) clamp(24px,8vw,120px) 36px',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          data-reveal="fade"
          style={{ display: 'flex', gap: 14, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6b6b6b' }}
        >
          <span>Contact</span>
        </div>

        <h2
          data-reveal="rise"
          style={{
            margin: '36px 0 0',
            fontFamily: "'DM Serif Display',serif",
            fontWeight: 400,
            fontSize: 'clamp(72px,13vw,220px)',
            lineHeight: 0.92,
            letterSpacing: '-.02em',
            color: '#f2f2f2',
          }}
        >
          Let's talk.
        </h2>

        <div
          style={{
            marginTop: 'clamp(40px,8vh,80px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <p
            data-reveal="up"
            style={{ margin: 0, maxWidth: 460, fontSize: 17, lineHeight: 1.7, color: '#a0a0a0', textWrap: 'pretty' }}
          >
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best
            to get back to you!
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a
              className="say-hello"
              href={`mailto:${EMAIL}`}
              onMouseMove={magMove}
              onMouseLeave={magLeave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 48,
                padding: '0 24px',
                borderRadius: 999,
                background: '#f2f2f2',
                color: '#0a0a0a',
                whiteSpace: 'nowrap',
                transition: 'transform .5s cubic-bezier(.2,.8,.2,1), background .3s',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, transition: 'transform .5s cubic-bezier(.2,.8,.2,1)' }}>
                Say hello →
              </span>
            </a>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 96 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              className="social-btn"
              onClick={onCopy}
              title="Copy email"
              aria-label="Copy email"
              style={{ ...social, padding: 0, font: 'inherit' }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </button>

            <a
              className="social-btn"
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
              style={social}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>

            <a
              className="social-btn"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              style={social}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>

            <span style={{ fontSize: 12, letterSpacing: '.08em', color: ACCENT }}>{copied ? 'Email copied' : ''}</span>
          </div>

          <footer
            style={{
              marginTop: 36,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 12,
              fontSize: 12,
              color: '#6b6b6b',
            }}
          >
            <span>© 2026 Jeremy Sim Wen Ze</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>Singapore · {clock}</span>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              style={{ color: '#a0a0a0' }}
            >
              Back to top ↑
            </a>
          </footer>
        </div>
      </div>
    </section>
  )
}
