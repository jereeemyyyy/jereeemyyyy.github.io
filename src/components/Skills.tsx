import { motion } from 'framer-motion'
import {
  SiReact,
  SiGo,
  SiPython,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiSequelize,
  SiDocker,
  SiCircleci,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import type { IconType } from 'react-icons'

const skills: { name: string; icon: IconType; color: string }[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Go Lang', icon: SiGo, color: '#00ADD8' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Express.js', icon: SiExpress, color: '#a0a0a0' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
  { name: 'Sequelize ORM', icon: SiSequelize, color: '#52B0E7' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Circle CI', icon: SiCircleci, color: '#343434' },
  { name: 'AWS ECS', icon: FaAws, color: '#FF9900' },
  { name: 'ECR', icon: FaAws, color: '#FF9900' },
  { name: 'RDS', icon: FaAws, color: '#FF9900' },
  { name: 'Lambda', icon: FaAws, color: '#FF9900' },
  { name: 'API Gateway', icon: FaAws, color: '#FF9900' },
  { name: 'DynamoDB', icon: FaAws, color: '#FF9900' },
  { name: 'Cognito', icon: FaAws, color: '#FF9900' },
]

export function Skills() {
  return (
    <section id="skills" className="min-h-screen flex items-center py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h3 className="text-muted-foreground tracking-[0.3em] text-lg uppercase font-bold text-foreground mb-2">
          Skills
        </h3>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-16 h-[1px] bg-gradient-to-r from-foreground/40 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skills.map(({ name, icon: Icon, color }, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-secondary/60 border border-border/50 text-sm text-foreground tracking-wide"
            >
              <Icon size={18} color={color} />
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
