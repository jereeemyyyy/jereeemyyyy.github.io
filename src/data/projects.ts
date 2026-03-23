export interface Project {
  id: number
  title: string
  type: string
  description: string
  year: string
  technologies: string[]
  color: string
  liveUrl?: string
  githubUrl?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Planly',
    type: 'AI Builders AgentForge Hackathon 2026, 3rd Place',
    description:
      'A multi-agent AI itinerary planner using Mastra framework with 5 specialised (Intent, Discovery, Recommendation, Planning, Execution) GPT-4o mini agent orchestrating end-to-end evernt discovery, ranking, scheduling, and automated booking workflows.',
    year: '2026',
    technologies: ['React', 'Node.js', 'MongoDB', 'Mastra', 'OpenAI'],
    color: '#e08a3a',
    githubUrl: 'https://github.com/AgentForge-Hackathon/agentic-itinerary-planner',
  },
  {
    id: 2,
    title: 'SQLancer',
    type: 'Open Source',
    description:
      'Contributed configurable JDBC driver loading system, enabling runtime driver version switching without recompilation',
    year: '2024',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    color: '#3ab878',
    githubUrl: 'https://github.com/sqlancer/sqlancer',
  },
  {
    id: 3,
    title: 'ClientHub',
    type: 'Full Stack',
    description:
      "An application that assist Financial Advisors in tracker the details of their clients by providing a platform to store and manage their client's information.",
    year: '2024',
    technologies: ['Java', 'JavaFX', 'Gradle'],
    color: '#5b7fb8',
    githubUrl: 'https://github.com/jereeemyyyy/tp',
  },
  {
    id: 4,
    title: 'SaveLah',
    type: 'Mobile',
    description:
      'A simple financial tracker app that streamlines the process of tracking your expenses by providing real time updates of your transactions',
    year: '2024',
    technologies: ['React Native', 'Supabase', 'TailwindCSS'],
    color: '#5b7fb8',
    githubUrl: 'https://github.com/jereeemyyyy/savelah-project',
  },
  {
    id: 5,
    title: 'CryptoPalace',
    type: 'Full Stack',
    description:
      'A website that tracks the prices of all cryptocurrencies and provide relevant information about the currencies',
    year: '2024',
    technologies: ['React', 'CoinGecko API'],
    color: '#5b7fb8',
    githubUrl: 'https://github.com/jereeemyyyy/cryptopalace',
  },
  {
    id: 6,
    title: 'Simple Web Forum',
    type: 'Full Stack',
    description:
      'A simple web forum page that contains basic CRUD functionalities for posts. My first every project!',
    year: '2023',
    technologies: ['Python', 'FastAPI', 'PostgreSQL'],
    color: '#5b7fb8',
    githubUrl: 'https://github.com/jereeemyyyy/CVWO-Frontend',
  },
]
