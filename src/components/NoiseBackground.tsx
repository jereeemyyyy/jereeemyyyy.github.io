import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { useTheme } from '@/providers/ThemeProvider'

// Generate rays from multiple scattered origin points
function useRays(count: number) {
  return useMemo(() => {
    // Create several origin points around the screen
    const origins = [
      { x: 15, y: 20 },
      { x: 85, y: 25 },
      { x: 20, y: 75 },
      { x: 80, y: 80 },
      { x: 50, y: 45 },
    ]
    
    return Array.from({ length: count }, (_, i) => {
      const origin = origins[i % origins.length]
      // Offset origin slightly for variation
      const originX = origin.x + (Math.random() - 0.5) * 10
      const originY = origin.y + (Math.random() - 0.5) * 10
      const angle = Math.random() * 360
      const length = 0.15 + Math.random() * 0.35
      const width = 0.3 + Math.random() * 1
      const opacity = 0.03 + Math.random() * 0.08
      const delay = Math.random() * 3
      return { id: i, originX, originY, angle, length, width, opacity, delay }
    })
  }, [count])
}

// Single ray component
function Ray({ 
  originX,
  originY,
  angle, 
  length, 
  width, 
  opacity, 
  delay,
  isDark 
}: { 
  originX: number
  originY: number
  angle: number
  length: number
  width: number
  opacity: number
  delay: number
  isDark: boolean
}) {
  const color = isDark ? '255,255,255' : '0,0,0'
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: `${width}px`,
        height: `${length * 50}vh`,
        left: `${originX}%`,
        top: `${originY}%`,
        transformOrigin: 'center bottom',
        transform: `rotate(${angle}deg) translateY(-50%)`,
        background: `linear-gradient(to top, rgba(${color},${opacity}) 0%, rgba(${color},${opacity * 0.3}) 50%, transparent 100%)`,
        filter: 'blur(0.5px)',
      }}
      animate={{ 
        opacity: [opacity * 0.3, opacity, opacity * 0.5, opacity * 0.8, opacity * 0.3],
      }}
      transition={{
        duration: 6 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Scattered star particles - more visible
function Stars({ count = 50, isDark }: { count?: number; isDark: boolean }) {
  const [stars, setStars] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    opacity: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5, // Larger stars
        opacity: 0.4 + Math.random() * 0.6, // More visible
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
      }))
    )
  }, [count])

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full pointer-events-none ${isDark ? 'bg-white' : 'bg-black'}`}
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: isDark 
              ? `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.5})`
              : `0 0 ${star.size * 2}px rgba(0,0,0,${star.opacity * 0.3})`,
          }}
          animate={{
            opacity: [0.1, star.opacity, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}
export function NoiseBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const rays = useRays(80)

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
      {/* Base gradient */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark 
            ? 'radial-gradient(ellipse at 50% 50%, rgba(20,20,25,1) 0%, rgba(8,8,10,1) 100%)'
            : 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,1) 0%, rgba(235,235,240,1) 100%)',
        }}
      />

      {/* Light rays from scattered origins */}
      <div className="absolute inset-0">
        {rays.map((ray) => (
          <Ray
            key={ray.id}
            originX={ray.originX}
            originY={ray.originY}
            angle={ray.angle}
            length={ray.length}
            width={ray.width}
            opacity={ray.opacity}
            delay={ray.delay}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <Stars count={80} isDark={isDark} />

      {/* Vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 100%)'
            : 'radial-gradient(ellipse at center, transparent 20%, rgba(245,245,245,0.7) 100%)',
        }}
      />

      {/* Subtle noise texture */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-[0.12]' : 'opacity-[0.06]'}`}>
        <filter id="noise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.9" 
            numOctaves="4" 
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
