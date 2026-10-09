import type { Line, Role, SectionId } from './types';

/*
 * What every version says the same way. Titles, dates and numbers follow
 * LinkedIn. A line that differs between versions, even slightly, is written
 * out in that version's file.
 */

const NAME = 'Keni Lam';

const LOCATION = 'San Jose, California';

const EMAIL = 'hello@ki-cl.com';

/*
 * Absolute, the site's own pages included: a PDF printed from a local run
 * would otherwise carry links to localhost.
 */
const LINKS = {
  adplist: {
    link: 'adplist.org/mentors/keni-lam',
    to: 'https://adplist.org/mentors/keni-lam',
  },
  experiments: {
    link: 'ki-cl.com/experiments',
    to: 'https://ki-cl.com/experiments',
  },
  github: { link: 'github.com/kenilam', to: 'https://github.com/kenilam' },
  linkedin: {
    link: 'linkedin.com/in/kenilam',
    to: 'https://www.linkedin.com/in/kenilam',
  },
  moonshot: {
    link: 'Ki.CL-moonshot-exercise',
    to: 'https://github.com/kenilam/Ki.CL-moonshot-exercise',
  },
} as const;

/** Under the name, in this order. */
const PROFILES = [LINKS.linkedin, LINKS.github, LINKS.experiments] as const;

const ORDER: readonly SectionId[] = [
  'summary',
  'experience',
  'projects',
  'skills',
  'mentoring',
  'education',
  'languages',
];

type Heading = Omit<Role, 'points'>;

const ROLES = {
  apple: {
    dates: 'Mar 2023 – Present',
    organisation: 'Apple',
    title: 'Lead Software Development Engineer',
  },
  ebay: {
    dates: 'Jan 2014 – Jun 2015',
    organisation: 'eBay',
    title: 'Design Engineer III, Human Interface Group',
  },
  indeed: {
    dates: 'May 2018 – Jan 2019',
    organisation: 'Indeed',
    title: 'Manager, Design Technology',
  },
  rakuten: {
    dates: 'Jan 2019 – Jan 2020',
    organisation: 'Rakuten Ready',
    title: 'Senior UX and Software Engineer',
  },
  retail: {
    dates: 'Jun 2015 – May 2018',
    organisation: 'Apple',
    title: 'Interactive Developer, Retail Interactive',
  },
  tesla: {
    dates: 'Jan 2020 – Mar 2023',
    organisation: 'Tesla',
    title: 'Staff Software Engineer',
  },
} as const satisfies Record<string, Heading>;

const APPLE = {
  designSystem:
    'Established and scaled a unified design system that gives multiple products a consistent UX and speeds up their development.',
  designSystems:
    'Established and scaled a unified design system that gives multiple products a consistent UX and speeds up their development. Also built a marketing design system and an enterprise design system.',
  federation:
    'Built a Module Federation front end and an Apollo Federation gateway serving 20+ subgraphs that communicate via gRPC, Node and PHP. 10+ federated mini-apps consume the component library and the federated graph.',
  lead: `Lead design and engineering for Apple University's cross-platform ecosystem, covering design systems, UX architecture and full-stack implementation.`,
  mcp: 'Built an MCP server that reads the component library and the gateway schemas, so non-technical owners can build a proof of concept and deploy it to an isolated sandbox.',
  messaging: 'Built a RabbitMQ message broker and a bulk-email service.',
  modernised:
    'Modernised the internal platforms for course scheduling and orientation, improving usability, performance and maintainability.',
  modernisedAcrossTeams:
    'Modernised the internal platforms for course scheduling and orientation, improving usability, performance and maintainability across distributed teams.',
} as const;

const TESLA = {
  federation: `Architected and implemented a GraphQL federation layer and Vite-based front-end infrastructure for modular development, helping internal systems scale with Tesla Energy's global operations.`,
  led: `Led UI/UX engineering for Tesla Energy's Solar platform, managing and mentoring an 8-person cross-functional team.`,
  outages:
    'Cut system outages from 20+ a week to near zero. Traced the main cause, a platform-wide failure, to database connection pools that generated code opened on every request.',
  standards:
    'Set front-end architecture standards and drove TypeScript adoption across the organisation.',
} as const;

const RAKUTEN = {
  launch:
    'Helped launch the MVP and shipped a delivery-monitoring system for the Chipotle partnership.',
} as const;

const INDEED = {
  team: 'Managed a cross-functional design technology team of 4 that rolled out a new design system and shipped experimental features to weekly A/B tests.',
} as const;

const RETAIL = {
  build:
    'Halved local build times by moving the build from Grunt to Webpack, and automated build-to-deployment on Jenkins.',
  frameworkAndLocales:
    'Shipped a shared React framework across three retail digital-signage products, and rolled out features and content to 30+ locales at every major product launch.',
  locales:
    'Rolled out features and content to 30+ locales at every major product launch.',
} as const;

const EBAY = {
  prototypes:
    'Prototyped the search results and item pages with product teams. A left-nav redesign raised engagement on third-level categories by 2% in Q4 2014.',
} as const;

const EARLIER: readonly Line[] = [
  'Senior UI Developer, Apple (contract via Tech Mahindra) · May 2013 – Jan 2014',
  'UI Developer, Apollo Group · Apr 2012 – May 2013',
  'Web and Product Designer, Hasco Enterprise, Osaka · Nov 2010 – Aug 2011',
  'Contract Web Designer, Le Ciel Bleu · Aug 2009 – Oct 2010',
];

const PROJECTS = {
  factoryArm: [
    { strong: 'Factory Arm.' },
    ' A 3D palletising cell in the browser. Planners run in web workers, and a Rust bridge relays protobuf frames over WebSocket to a digital twin in NVIDIA Isaac Sim.',
  ],
  /** Where the experiments run and where their code is. */
  where: ['Live at ', LINKS.experiments, ', with code at ', LINKS.github, '.'],
} as const satisfies Record<string, Line>;

const SKILLS = {
  design: [
    { strong: 'Design:' },
    ' design systems, component libraries, prototyping, Figma, accessibility, internationalisation',
  ],
  platform: [
    { strong: 'Platform:' },
    ' GCP (Cloud Run), Docker, CI/CD with GitHub Actions and Jenkins',
  ],
} as const satisfies Record<string, Line>;

const MENTORING: Line = [
  'ADPList mentor: 426 sessions and 21,000 minutes with designers and engineers, 52 reviews, and in the top 10% of contributors in my field. ',
  LINKS.adplist,
];

const EDUCATION: readonly Line[] = [
  'MA Applied Imagination, Central Saint Martins, University of the Arts London · 2008',
  'BA Fine Arts (Painting / Sculpture), University of Brighton · 2003',
  'Foundation in Art and Design, University of the Arts London · 2000',
];

const LANGUAGES: Line =
  'English, Cantonese, Mandarin and Japanese, all native or bilingual.';

export {
  APPLE,
  EARLIER,
  EBAY,
  EDUCATION,
  EMAIL,
  INDEED,
  LANGUAGES,
  LINKS,
  LOCATION,
  MENTORING,
  NAME,
  ORDER,
  PROFILES,
  PROJECTS,
  RAKUTEN,
  RETAIL,
  ROLES,
  SKILLS,
  TESLA,
};
