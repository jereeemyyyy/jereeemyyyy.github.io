import { ThemeProvider } from '@/providers/ThemeProvider'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { NoiseBackground } from '@/components/NoiseBackground'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-foreground selection:bg-primary/20 selection:text-primary">
        <NoiseBackground />
        <Header />
        <main className="flex flex-col">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
