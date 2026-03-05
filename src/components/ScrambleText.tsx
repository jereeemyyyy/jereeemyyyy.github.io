import { useEffect, useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number        // ms before initial scramble starts
  duration?: number     // ms per character reveal
  scrambleSpeed?: number // ms between scramble updates
}

export function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 50,
  scrambleSpeed = 30,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const revealIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const revealIndexRef = useRef(0)

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (revealIntervalRef.current) {
      clearInterval(revealIntervalRef.current)
      revealIntervalRef.current = null
    }
  }, [])

  const scramble = useCallback(() => {
    cleanup()
    revealIndexRef.current = 0

    // Scramble interval - rapidly change unrevealed characters
    intervalRef.current = setInterval(() => {
      const revealed = text.slice(0, revealIndexRef.current)
      const scrambleLength = text.length - revealIndexRef.current
      const scrambled = Array.from({ length: scrambleLength }, (_, i) => {
        // Preserve spaces
        if (text[revealIndexRef.current + i] === ' ') return ' '
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')

      setDisplayed(revealed + scrambled)
    }, scrambleSpeed)

    // Reveal interval - lock in characters one by one
    revealIntervalRef.current = setInterval(() => {
      revealIndexRef.current++
      if (revealIndexRef.current >= text.length) {
        cleanup()
        setDisplayed(text)
      }
    }, duration)
  }, [text, duration, scrambleSpeed, cleanup])

  // Scramble on initial mount after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble()
    }, delay)

    return () => {
      clearTimeout(timeout)
      cleanup()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span 
      className={`cursor-pointer ${className}`}
      onMouseEnter={scramble}
    >
      {displayed}
    </span>
  )
}
