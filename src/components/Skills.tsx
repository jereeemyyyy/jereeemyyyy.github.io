import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { skillCategories } from '@/data/skills'

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const category = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const badge = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <section id="skills" className="min-h-screen flex items-center py-32">
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
            Skills
          </motion.h2> */}

          <h3 className="text-muted-foreground tracking-[0.3em] text-lg uppercase font-bold text-white mb-2">Skills</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-[1px] bg-gradient-to-r from-foreground/40 to-transparent"></div>
            </div>    

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={category}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.div key={skill} variants={badge}>
                      <Badge variant="secondary" className="text-sm py-1 px-3">
                        {skill}
                      </Badge>
                    </motion.div>
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
