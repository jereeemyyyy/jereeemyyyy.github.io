import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export function Header() {
  const [activeSection, setActiveSection] = useState('')
  const scrollingToRef = useRef<string | null>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          // While a programmatic scroll is in flight, only accept the target section
          if (scrollingToRef.current && entry.target.id !== scrollingToRef.current) return
          setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 p-1.5 bg-secondary/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg"
      >
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full block',
                  activeSection === item.href.substring(1)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const targetId = item.href.substring(1)
                  const element = document.querySelector(item.href)
                  // Lock the active tab immediately and suppress observer
                  // updates for intermediate sections during the scroll
                  scrollingToRef.current = targetId
                  setActiveSection(targetId)
                  element?.scrollIntoView({ behavior: 'smooth' })
                  // Release the lock after scroll animation completes (~800ms)
                  if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
                  scrollTimerRef.current = setTimeout(() => {
                    scrollingToRef.current = null
                  }, 800)
                }}
              >
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-background/50 rounded-full shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="w-px h-4 bg-border mx-1" />
        <ThemeToggle />
      </motion.nav>
    </header>
  )
}
