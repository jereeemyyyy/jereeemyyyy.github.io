import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ rotate: 15 }}
      onClick={toggleTheme}
      className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  )
}
