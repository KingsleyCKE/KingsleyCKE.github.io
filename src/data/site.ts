export const site = {
  name: 'Chikezie Ekejiuba',
  title: 'Chikezie Ekejiuba: Backend-focused CS student',
  intro:
    'Backend-focused CS student in Brooklyn. I build Python and Django systems, deploy them, and write up how they work.',
  email: 'chikezieekejiuba@gmail.com',
  github: 'https://github.com/KingsleyCKE',
  linkedin: 'TODO(Chikezie): LinkedIn profile URL',
  resume: '/resume.pdf',
  sourceRepo: 'https://github.com/KingsleyCKE/KingsleyCKE.github.io',
  experience: [
    'FAA, MSI GATEWAY Student Intern',
    'Google Software Engineering Program (G-SWEP)',
    'J.P. Morgan Code for Good Hackathon',
  ],
  skills: {
    Languages: ['Python', 'C++', 'JavaScript', 'HTML', 'CSS'],
    'Frameworks & libraries': ['Django', 'Flask', 'React', 'Angular', 'Selenium', 'BeautifulSoup', 'OpenCV'],
    'Data & infrastructure': ['PostgreSQL', 'SQLite', 'DynamoDB', 'AWS', 'Heroku', 'Git'],
  },
  // `section` marks the link as current (aria-current="true") on pages under that path
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects', section: '/projects/' },
    { label: 'Build Log', href: '/log/', section: '/log/' },
    { label: 'About', href: '/about/' },
  ],
} as const;

// Undefined while the LinkedIn URL is still a TODO, so callers omit the link instead of rendering a broken one
export const linkedinUrl: string | undefined = site.linkedin.startsWith('TODO') ? undefined : site.linkedin;
