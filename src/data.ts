export const profile = {
  name: 'John Loyd W. Guanzon',
  shortName: 'John Loyd',
  email: 'johnloydwasquin27@gmail.com',
  phone: '09317683228',
  location: 'Lipa City, Batangas, Philippines',
  github: 'https://github.com/JohnLoydWasquin',
  university: 'Batangas State University – The National Engineering University, Lipa Campus',
}

export type Project = {
  id: string
  number: string
  name: string
  short: string
  category: string
  year: string
  tags: string[]
  theme: string
  problem: string
  solution: string
  features: string[]
  contribution: string
  stage?: string
  repoUrl?: string
  infoUrl?: string
  visualLabel?: string
}

export const projects: Project[] = [
  {
    id: 'ridenow', number: '01', name: 'RideNow',
    short: 'A car rental management platform spanning reservations, verification, and staff operations.',
    category: 'Group project · Rental management', year: '2025',
    tags: ['Laravel 12', 'PHP', 'MySQL', 'JavaScript', 'REST APIs'], theme: 'ridenow',
    problem: 'Vehicle reservations and rental operations involve customer, staff, and administrative workflows that need to stay connected.',
    solution: 'The public repository contains a Laravel application with dedicated customer, staff, and admin modules for rental operations.',
    features: ['Vehicle listings and reservations', 'Customer authentication and profile workflows', 'Admin and staff vehicle and booking management', 'KYC submission, SMS service, reporting, and internal chat modules'],
    contribution: 'This is a group repository. The source does not identify my individual responsibilities, so I have not assigned myself specific modules.',
    repoUrl: 'https://github.com/JohnLoydWasquin/Group5CarRental',
    visualLabel: 'Conceptual project cover · repository has no application screenshots',
  },
  {
    id: 'jumpstart', number: '02', name: 'Jumpstart Therapy Center',
    short: 'A capstone system for therapy-center operations, analytics, and decision support.',
    category: 'Capstone · Healthcare technology', year: '2026 · In progress',
    tags: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Chart.js'], theme: 'jumpstart',
    stage: 'Capstone project in progress · details supplied for this portfolio',
    problem: 'Therapy-center teams need a clear way to manage information and review schedules, attendance, and service trends.',
    solution: 'The capstone is described as a web system for centralized information management, data analysis, and decision-support workflows.',
    features: ['Patient and parent workflows', 'Scheduling and attendance monitoring', 'Analytics and trend visualizations', 'Role-based access and administrative workflows'],
    contribution: 'Capstone work in progress. The supplied repository URL currently returns not found, so this summary uses the project information provided for the portfolio and includes no source link.',
    infoUrl: 'https://jumpstartcenter.cc/',
    visualLabel: 'Conceptual project cover · not a clinical system screenshot',
  },
  {
    id: 'cinetrack', number: '03', name: 'CineTrack',
    short: 'A Flutter movie discovery and watchlist app with a layered mobile-app structure.',
    category: 'Mobile app · In progress', year: 'In progress',
    tags: ['Flutter', 'Dart', 'Provider', 'TMDB API', 'Supabase'], theme: 'cinetrack',
    stage: 'Scaffold in progress · as stated in the repository README',
    problem: 'Movie discovery and personal watchlists bring browsing, saved titles, and account data together in one mobile experience.',
    solution: 'The repository has a Flutter scaffold organized into data, domain, and presentation layers, with movie, search, favorites, and watchlist modules.',
    features: ['Movie discovery and search modules', 'Movie details and favorites screens', 'Watchlist and account modules', 'README marks the project scaffold as in progress'],
    contribution: 'The public repository is under my GitHub profile. Its README describes the app as a learning project and scaffold in progress; this case study reflects that status.',
    repoUrl: 'https://github.com/JohnLoydWasquin/cinetrack_app',
    visualLabel: 'Conceptual project cover · no app screenshots in the repository',
  },
]

export const skills = [
  { title: 'Frontend', index: '01', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend', index: '02', items: ['PHP', 'Python', 'FastAPI', 'Laravel', 'REST APIs'] },
  { title: 'Data & databases', index: '03', items: ['MySQL', 'PostgreSQL', 'Supabase', 'SQL', 'Relational design'] },
  { title: 'Tools & workflow', index: '04', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'XAMPP'] },
]

export const additionalSkills = ['TypeScript', 'Flutter', 'Chart.js']

