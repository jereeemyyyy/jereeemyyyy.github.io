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
      'Building AI Powered and agentic tools for the Ministry of Manpower to improve efficient and to streamline internal workflows.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Docker', 'AWS ECS', 'AWS ECR', 'AWS RDS', 'AWS Lambda', 'AWS API Gateway', 'AWS S3'],
  },
  {
    id: 2,
    role: 'Full Stack Developer Intern',
    company: 'Mavericks Consulting',
    period: 'May 2025 – Jan 2026',
    description:
      'Full-stack developer building scalable HR and SaaS platforms with React/React Native and AWS, automating workflows and CI/CD to improve efficiency and delivery speed.',
    technologies: ['React', 'React Native', 'Express.js', 'PostgreSQL', 'Docker', 'Sequelize ORM','AWS ECS', 'AWS ECR', 'AWS RDS', 'AWS Lambda', 'AWS S3', 'AWS EventBridge', 'CircleCI'],
  },
  {
    id: 3,
    role: 'Software Engineer Intern',
    company: 'Really Addictive Drinks',
    period: 'Feb 2025 – Apr 2025',
    description:
      'Developed an AI powered drink recommendation system using OpenAI GPT-4 API, React and Express.js, processing 500+ customer feedback entries to generate personalised drink modifications',
    technologies: ['React', 'Express.js', 'OpenAI API', 'Brevo API'],
  },
    {
    id: 4,
    role: 'Full Stack Developer Intern',
    company: 'Columbus Technologies Platform',
    period: 'Dec 2024 – Feb 2025',
    description:
      'Optimised PDF invoice generation pipeline, reducing processing time by 35% for 1000+ monthly shipments through improved ETA/ETD data synchronisation',
    technologies: ['React', 'Go', 'MongoDB', 'Docker', 'AWS ECS', 'AWS ECR'],
  },
]
