export interface SkillCategory {
  id: number
  name: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: 'Frontend',
    skills: ['React'],
  },
  {
    id: 2,
    name: 'Backend',
    skills: ['Go Lang', 'Python', 'TypeScript', 'Express.js'],
  },
  {
    id: 3,
    name: 'Database',
    skills: ['MongoDB', 'PostgreSQL'],
  },
  {
    id: 4,
    name: 'Tools',
    skills: ['Supabase', 'Sequelize ORM', 'Docker', 'Circle CI'],
  },
  {
    id: 5,
    name: 'Cloud Services',
    skills: ['AWS ECS', 'ECR', 'RDS', 'Lambda', 'API Gateway', 'DynamoDB', 'Cognito'],
  },
]
