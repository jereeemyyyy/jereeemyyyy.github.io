import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { experiences } from '@/data/experience'

export function Experience() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  }

  return (
    <section id="experience" className="min-h-screen flex items-center py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12"
          > 
            Experience
          </motion.h2> */}

          <h3 className="text-muted-foreground tracking-[0.3em] text-lg uppercase font-bold text-foreground mb-2">Experience</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-[1px] bg-gradient-to-r from-foreground/40 to-transparent"></div>
            </div>  

          <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={item}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary border border-background shadow-[0_0_0_4px_var(--background)]" />
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                </div>
                
                <div className="text-lg text-primary/80 mb-4 font-medium">{exp.company}</div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
