export interface Project {
  id: number
  title: string
  category: string
  description: string
  year: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

// ─────────────────────────────────────────────────────
// Add your projects here.
// Set featured: true to highlight a project at the top.
// ─────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: 'Project One',
    category: 'Full Stack',
    description:
      'A short description of what this project does and the problem it solves.',
    year: '2025',
    technologies: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/project-one',
    featured: true,
  },
  {
    id: 2,
    title: 'Project Two',
    category: 'Web Development',
    description:
      'A short description of what this project does and the problem it solves.',
    year: '2024',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/project-two',
    liveUrl: 'https://your-project.com',
  },
  {
    id: 3,
    title: 'Project Three',
    category: 'Backend',
    description:
      'A short description of what this project does and the problem it solves.',
    year: '2024',
    technologies: ['Python', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/project-three',
  },
]
