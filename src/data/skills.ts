export interface SkillCategory {
  id: number
  name: string
  skills: string[]
}

// ─────────────────────────────────────────────────────
// Add your skills here, grouped by category.
// ─────────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
  },
  {
    id: 2,
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML & CSS', 'Framer Motion'],
  },
  {
    id: 3,
    name: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'GraphQL'],
  },
  {
    id: 4,
    name: 'Tools & Platforms',
    skills: ['Git', 'Docker', 'PostgreSQL', 'MongoDB', 'AWS'],
  },
]
