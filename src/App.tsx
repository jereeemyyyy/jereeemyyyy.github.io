import { usePortfolio } from '@/hooks/usePortfolio'
import { Backdrop } from '@/components/Backdrop'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Work } from '@/components/Work'
import { Stack } from '@/components/Stack'
import { Contact } from '@/components/Contact'
import { CommandPalette } from '@/components/CommandPalette'

function App() {
  const { refs, inputRef, clock, exp, pickExp, copied, copyEmail, palette, nav } = usePortfolio()

  return (
    <>
      <Backdrop canvasRef={refs.canvas} />

      <Nav
        navRef={refs.nav}
        indRef={refs.ind}
        ringRef={refs.ring}
        tipRef={refs.tip}
        cursorRef={refs.cursor}
        onTop={nav.goTop}
        onSection={nav.goSection}
        onPalette={nav.openPaletteFromNav}
        onHover={nav.setHover}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero clock={clock} scrollLineRef={refs.scrollLine} />
        <About stmtRef={refs.stmt} photoRef={refs.photo} />
        <Experience sectionRef={refs.expSec} detailRef={refs.detail} active={exp} onPick={pickExp} />
        <Work sectionRef={refs.hsec} trackRef={refs.track} countRef={refs.hCount} barRef={refs.hBar} />
        <Stack rowARef={refs.rowA} rowBRef={refs.rowB} />
        <Contact clock={clock} copied={copied} onCopy={copyEmail} />
      </main>

      <CommandPalette
        open={palette.open}
        q={palette.q}
        sel={palette.sel}
        commands={palette.filtered}
        inputRef={inputRef}
        onQuery={(v) => {
          palette.setQ(v)
          palette.setSel(0)
        }}
        onHover={palette.setSel}
        onRun={palette.runCommand}
        onClose={palette.closePalette}
      />
    </>
  )
}

export default App
