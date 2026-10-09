import type { Version } from './types';

import {
  APPLE,
  EARLIER,
  EBAY,
  EDUCATION,
  INDEED,
  LANGUAGES,
  LINKS,
  MENTORING,
  ORDER,
  PROJECTS,
  RAKUTEN,
  RETAIL,
  ROLES,
  SKILLS,
  TESLA,
} from './shared';

/** For front-end and AI product roles: federation and the agents first. */
const FRONTEND_AI: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...ROLES.apple,
      points: [
        APPLE.federation,
        APPLE.mcp,
        APPLE.designSystems,
        `Lead design and engineering for Apple University's cross-platform ecosystem, covering UX architecture and full-stack implementation.`,
        APPLE.modernisedAcrossTeams,
      ],
    },
    {
      ...ROLES.tesla,
      points: [TESLA.federation, TESLA.outages, TESLA.standards, TESLA.led],
    },
    { ...ROLES.rakuten, points: [RAKUTEN.launch] },
    { ...ROLES.indeed, points: [INDEED.team] },
    {
      ...ROLES.retail,
      points: [RETAIL.frameworkAndLocales, RETAIL.build],
    },
    {
      ...ROLES.ebay,
      points: [
        EBAY.prototypes,
        'Built a kiosk that showed live transaction data on a 3D globe, using D3.js and three.js.',
      ],
    },
  ],
  headline:
    'Lead Front-End Engineer · Design systems, federated platforms and AI products',
  languages: LANGUAGES,
  mentoring: MENTORING,
  name: 'Front end and AI',
  order: ORDER,
  projects: {
    intro: [
      'Live at ',
      LINKS.experiments,
      ' unless noted, with code at ',
      LINKS.github,
      '.',
    ],
    items: [
      [
        { strong: 'Image Agent.' },
        ' A public prompt-to-image agent, built to learn what it takes to put an AI feature in front of real people. A clarifier asks one question at a time, up to three, and code enforces the limit. The workflow is fixed in code as well, so the model never chooses its own tools. A vision model reviews each picture and can trigger one retry. Every request passes four checks, cheapest first: rate limits, rule checks, moderation and a small classifier. Quotas are counted in MongoDB, and progress arrives over a GraphQL subscription.',
      ],
      [
        { strong: 'Tree of Life.' },
        ` A walk through the Open Tree of Life's 2.3 million species, cached in MongoDB as a parent-pointer tree. Illustrations are generated on demand by a fixed pipeline: resolve the lineage, pick a living specimen, write the prompt, generate, score with a vision model, retry once. Text, image and vision calls each have their own provider failover chain, with timeouts and cooldowns.`,
      ],
      [
        { strong: 'Writing reviewer' },
        ' (code only: ',
        LINKS.moonshot,
        '). Reviews commit messages, pull-request descriptions and READMEs with Claude. The model returns structured edits, each tied to a named rule. Code locates every quote and drops any edit that does not match exactly. It turns away prompt-injection attempts and has an eval set.',
      ],
      PROJECTS.factoryArm,
      [
        { strong: 'Ki.CL platform.' },
        ' The federated platform under all of these. A React host loads a design-system remote and a typed GraphQL client at runtime, and production runs on Cloud Run in two regions behind a global load balancer.',
      ],
    ],
  },
  skills: [
    [
      { strong: 'AI:' },
      ' LLM applications on the Claude, OpenAI and Groq APIs, MCP servers, structured outputs, evals, retrieval-augmented generation, moderation and rate limiting, provider failover',
    ],
    [
      { strong: 'Front end:' },
      ' TypeScript, React, Next.js, Vue, Vite, Webpack, Module Federation, Three.js, WebGL, Sass, Tailwind, React Native (Expo)',
    ],
    [
      { strong: 'Back end:' },
      ' Node.js, GraphQL (Apollo Federation, subscriptions), gRPC, RabbitMQ, MongoDB, SQL, WebSockets, Python',
    ],
    SKILLS.platform,
    SKILLS.design,
  ],
  slug: 'frontend-ai',
  summary: `Front-end and full-stack engineer with 15+ years of experience, currently leading design and engineering for Apple University's platform. I build design systems and federated front-end and GraphQL architectures, and I ship AI features end to end: an MCP server at Apple, and public agents of my own with cost, abuse and quality controls built in. I trained in fine art and design before moving into engineering.`,
};

export { FRONTEND_AI };
