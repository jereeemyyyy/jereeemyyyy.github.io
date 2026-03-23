import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <h3 className="text-muted-foreground tracking-[0.3em] text-lg uppercase font-bold text-foreground mb-2">
          Projects
        </h3>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-foreground/40 to-transparent"></div>
        </div>  

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Number + type label */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-muted-foreground text-sm tracking-[0.2em]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="w-10 h-[1px] bg-muted-foreground/40" />
                <span className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
                  {project.type}
                </span>
              </div>

              {/* Title */}
              <h4
                className="text-4xl md:text-5xl text-foreground mb-5 leading-[1.05]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {project.title}
              </h4>

              {/* Colored card */}
              <a
                href={project.liveUrl || project.githubUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden group cursor-pointer"
                style={{ backgroundColor: project.color }}
              >
                {/* Description */}
                <div className="px-7 pt-7 pb-5">
                  <p className="text-white/90 text-base leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative px-4 pb-0">
                  <div className="rounded-t-lg overflow-hidden bg-black/20 aspect-[4/3] flex items-center justify-center transition-transform duration-500 group-hover:translate-y-[-4px]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white/30 text-sm tracking-widest uppercase">
                        Project Image
                      </span>
                    )}
                  </div>
                </div>
              </a>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full border border-border/60 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
