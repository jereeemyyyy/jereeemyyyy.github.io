export interface Experience {
  id: number
  role: string
  company: string
  period: string
  description: string
  technologies: string[]
  link?: string
}

// ─────────────────────────────────────────────────────
// Add your work experiences here.
// They will appear in order — most recent first.
// ─────────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Engineering Intern',
    company: 'GovTech Singapore',
    period: 'Jan 2026 – Present',
    description:
      'Brief description of what you worked on, impact you made, and any key achievements.',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    id: 2,
    role: 'Full Stack Developer Intern',
    company: 'Mavericks Consulting',
    period: 'May 2025 – Dec 2025',
    description:
      'Brief description of what you worked on, impact you made, and any key achievements.',
    technologies: ['Python', 'PostgreSQL', 'Docker'],
  },
]
