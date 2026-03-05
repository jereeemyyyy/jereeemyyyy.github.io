import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { ScrambleText } from './ScrambleText'

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl w-full mx-auto px-6"
      >
        <motion.p variants={item} className="text-sm uppercase tracking-wide text-primary mb-2">
          <ScrambleText text="Hi, my name is" delay={300} duration={40} />
        </motion.p>
        <motion.h1
          variants={item}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-4"
        >
          <ScrambleText text="Jeremy" delay={600} duration={80} />
        </motion.h1>
        
        <motion.div variants={item} className="flex items-center gap-2 text-xl md:text-2xl text-muted-foreground font-light">
          <ScrambleText text="Aspiring Full Stack Developer building things that matter" delay={1000} duration={30} />
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-6 md:h-8 bg-primary ml-1 align-middle"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-muted-foreground w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
