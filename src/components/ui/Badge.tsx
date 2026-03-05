import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'secondary'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    outline: 'border border-border text-muted-foreground',
    secondary: 'bg-secondary text-secondary-foreground border-transparent',
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.span>
  )
}
