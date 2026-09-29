export const ACCENT = '#cdf24a'
export const EMAIL = 'jeremyswz28@gmail.com'
export const GITHUB = 'https://github.com/jereeemyyyy'
export const GITHUB_HANDLE = 'github.com/jereeemyyyy'
export const LINKEDIN = 'https://www.linkedin.com/in/jeremysimwenze/'

/* ── tunables (the mockup exposed these as design props) ───────────── */
export const SETTINGS = {
  navMode: 'auto' as 'auto' | 'rail' | 'orb' | 'top',
  constellation: true,
  starCount: 220,
  customCursor: true,
  magneticName: true,
}

/* ── sections / nav ────────────────────────────────────────────────── */
export type SectionId = 'about' | 'experience' | 'work' | 'stack' | 'contact'

export interface SectionEntry {
  id: SectionId
  num: string
  label: string
}

export const SECTIONS: SectionEntry[] = [
  { id: 'about', num: '01', label: 'About' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'work', num: '03', label: 'Work' },
  { id: 'stack', num: '04', label: 'Stack' },
  { id: 'contact', num: '05', label: 'Contact' },
]

/* ── experience ────────────────────────────────────────────────────── */
export interface ExperienceEntry {
  role: string
  company: string
  period: string
  desc: string
  tech: string[]
}

export const EXPERIENCES: ExperienceEntry[] = [
  {
    role: 'Software Engineering Intern',
    company: 'GovTech Singapore',
    period: 'Jan 2026 – Present',
    desc: 'Building AI-powered and agentic tools for the Ministry of Manpower to improve efficiency and streamline internal workflows.',
    tech: ['React', 'TypeScript', 'Node.js', 'Docker', 'AWS ECS', 'AWS RDS', 'AWS Lambda', 'AWS API Gateway', 'AWS S3'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Mavericks Consulting',
    period: 'May 2025 – Jan 2026',
    desc: 'Built scalable HR and SaaS platforms with React / React Native and AWS, automating workflows and CI/CD to improve efficiency and delivery speed.',
    tech: ['React', 'React Native', 'Express.js', 'PostgreSQL', 'Docker', 'Sequelize', 'AWS ECS', 'AWS Lambda', 'AWS S3', 'CircleCI'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Really Addictive Drinks',
    period: 'Feb 2025 – Apr 2025',
    desc: 'Developed an AI-powered drink recommendation system using the OpenAI GPT-4 API, React and Express.js, processing 500+ customer feedback entries to generate personalised drink modifications.',
    tech: ['React', 'Express.js', 'OpenAI API', 'Brevo API'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Columbus Technologies',
    period: 'Dec 2024 – Feb 2025',
    desc: 'Optimised the PDF invoice generation pipeline, reducing processing time by 35% for 1,000+ monthly shipments through improved ETA/ETD data synchronisation.',
    tech: ['React', 'Go', 'MongoDB', 'Docker', 'AWS ECS', 'AWS ECR'],
  },
]

export const EXPERIENCE_RANGE = 'Dec 2024 — Present'

/* ── work ──────────────────────────────────────────────────────────── */
export interface ProjectEntry {
  title: string
  type: string
  award?: string
  year: string
  color: string
  url: string
  image?: string
  tech: string[]
  desc: string
}

export const PROJECTS: ProjectEntry[] = [
  {
    title: 'Planly',
    type: 'Hackathon',
    award: 'AgentForge 2026 · 3rd',
    year: '2026',
    color: '#e08a3a',
    url: 'https://github.com/AgentForge-Hackathon/agentic-itinerary-planner',
    tech: ['React', 'Node.js', 'MongoDB', 'Mastra', 'OpenAI'],
    desc: 'A multi-agent AI itinerary planner built on Mastra. Five specialised GPT-4o mini agents (Intent, Discovery, Recommendation, Planning, Execution) orchestrate event discovery, ranking, scheduling and automated booking end to end.',
  },
  {
    title: 'SQLancer',
    type: 'Open Source',
    year: '2024',
    color: '#3ab878',
    url: 'https://github.com/sqlancer/sqlancer',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    desc: 'Contributed a configurable JDBC driver loading system, enabling runtime driver version switching without recompilation.',
  },
  {
    title: 'ClientHub',
    type: 'Full Stack',
    year: '2024',
    color: '#5b7fb8',
    url: 'https://github.com/jereeemyyyy/tp',
    image: '/ClientHub.png',
    tech: ['Java', 'JavaFX', 'Gradle'],
    desc: "An application that helps financial advisors keep track of their clients, with one place to store and manage every client's information.",
  },
  {
    title: 'SaveLah',
    type: 'Mobile',
    year: '2024',
    color: '#7c5bbf',
    url: 'https://github.com/jereeemyyyy/savelah-project',
    image: '/savelah2.png',
    tech: ['React Native', 'Supabase', 'TailwindCSS'],
    desc: 'A simple financial tracker app that streamlines expense tracking with real-time updates of your transactions.',
  },
  {
    title: 'CryptoPalace',
    type: 'Full Stack',
    year: '2024',
    color: '#c75a6a',
    url: 'https://github.com/jereeemyyyy/cryptopalace',
    image: '/cryptopalace.png',
    tech: ['React', 'CoinGecko API'],
    desc: 'A website that tracks the prices of all cryptocurrencies and surfaces relevant information about each one.',
  },
  {
    title: 'Simple Web Forum',
    type: 'Full Stack',
    year: '2023',
    color: '#4a9e9e',
    url: 'https://github.com/jereeemyyyy/CVWO-Frontend',
    tech: ['Python', 'FastAPI', 'PostgreSQL'],
    desc: 'A simple web forum with basic CRUD functionality for posts. My first ever project!',
  },
]

/* ── about ─────────────────────────────────────────────────────────── */
export const STATEMENT =
  "I'm Jeremy, a full stack developer who got here by wondering how things work on the internet. I build intuitive, performant web apps, and lately, agentic AI tools."

export const ABOUT_PARAGRAPHS = [
  "That early curiosity turned into a steady pursuit of modern web technologies. Right now I'm going deeper on React, TypeScript and server-side systems.",
  'I enjoy tackling complex problems and turning ideas into things people can actually use.',
]

export const ABOUT_FACTS: [string, string][] = [
  ['Based in', 'Singapore'],
  ['Studying', 'National University of Singapore'],
  ['Focus', 'Full stack, agentic AI tools'],
  ['Off-court', 'Tennis, basketball, the gym'],
]

/* ── stack ─────────────────────────────────────────────────────────── */
const SI = 'https://cdn.simpleicons.org/'
const AWS = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg'

const ICONS: Record<string, string> = {
  React: SI + 'react',
  TypeScript: SI + 'typescript',
  Go: SI + 'go',
  Python: SI + 'python',
  'Express.js': SI + 'express/ffffff',
  MongoDB: SI + 'mongodb',
  PostgreSQL: SI + 'postgresql',
  Supabase: SI + 'supabase',
  Docker: SI + 'docker',
  CircleCI: SI + 'circleci/ffffff',
  Sequelize: SI + 'sequelize',
}

export const iconFor = (name: string) => ICONS[name] ?? AWS

export type CategoryId = 'fe' | 'be' | 'data' | 'cloud'

export const CATEGORIES: { id: CategoryId; name: string }[] = [
  { id: 'fe', name: 'Frontend' },
  { id: 'be', name: 'Backend' },
  { id: 'data', name: 'Data & tools' },
  { id: 'cloud', name: 'Cloud' },
]

export type StackItem = [name: string, category: CategoryId]

export const ROW_A: StackItem[] = [
  ['React', 'fe'],
  ['TypeScript', 'be'],
  ['Go', 'be'],
  ['Python', 'be'],
  ['Express.js', 'be'],
  ['MongoDB', 'data'],
  ['PostgreSQL', 'data'],
  ['Supabase', 'data'],
]

export const ROW_B: StackItem[] = [
  ['Docker', 'data'],
  ['CircleCI', 'data'],
  ['Sequelize', 'data'],
  ['AWS ECS', 'cloud'],
  ['ECR', 'cloud'],
  ['RDS', 'cloud'],
  ['Lambda', 'cloud'],
  ['API Gateway', 'cloud'],
  ['DynamoDB', 'cloud'],
  ['Cognito', 'cloud'],
]
