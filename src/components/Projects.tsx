import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'

export function Projects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const card = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="projects" className="min-h-screen flex items-center py-32">
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
            Featured Projects
          </motion.h2> */}

          <h3 className="text-muted-foreground tracking-[0.3em] text-lg uppercase font-bold text-white mb-2">Projects</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-[1px] bg-gradient-to-r from-foreground/40 to-transparent"></div>
            </div>  

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={card}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 shadow-sm transition-shadow hover:shadow-md hover:bg-card/50",
                  project.featured ? "md:col-span-2 md:flex-row md:items-start md:gap-8" : ""
                )}
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-xl tracking-tight text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.category}</p>
                    </div>
                    {project.year && (
                      <Badge variant="outline" className="text-xs font-mono">
                        {project.year}
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className={cn(
                  "flex items-center gap-4 mt-6",
                  project.featured ? "md:mt-0 md:self-start" : ""
                )}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                      aria-label="View Source"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                      aria-label="View Live Site"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
