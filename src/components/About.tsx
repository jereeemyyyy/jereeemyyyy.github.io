import { motion } from 'framer-motion'
import { MapPin, Briefcase, Code, Aperture, School} from 'lucide-react'

export function About() {
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
    <section id="about" className="min-h-screen flex items-center py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div variants={item}>
            {/* <h2 className="text-4xl font-bold mb-6 tracking-tight">About Me</h2> */}
            <h3 className="text-muted-foreground tracking-[0.3em] text-lg uppercase font-bold text-white mb-2">About Me</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-[1px] bg-gradient-to-r from-foreground/40 to-transparent"></div>
            </div>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                I'm Jeremy, an aspiring Full Stack Developer with a passion for building intuitive and performant web applications. 
                My journey into software development started with a curiosity about how things work on the internet, 
                and has evolved into a dedicated pursuit of mastering modern web technologies.
              </p>
              <p>
                Currently, I'm focused on deepening my understanding of React, TypeScript, and server-side technologies. 
                I enjoy tackling complex problems and turning ideas into functional, user-friendly solutions. 
                When I'm not coding, you can find me exploring new tech trends or contributing to open-source projects, 
                playing tennis, basketball or going to the gym.
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-card/30 p-6 rounded-2xl border border-border/50 shadow-sm backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Quick Facts
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Singapore</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <School className="w-5 h-5 text-primary" />
                <span>National University Of Singapore</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>Open to new opportunities</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Code className="w-5 h-5 text-primary" />
                <span>Full Stack Development</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Aperture className="w-5 h-5 text-primary" />
                <span>Tennis Fanatic</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
