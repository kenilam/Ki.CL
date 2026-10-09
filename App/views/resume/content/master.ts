import type { Version } from './types';

import {
  APPLE,
  EARLIER,
  EBAY,
  EDUCATION,
  LANGUAGES,
  MENTORING,
  ORDER,
  PROJECTS,
  RAKUTEN,
  RETAIL,
  ROLES,
  SKILLS,
  TESLA,
} from './shared';

/** The full record. The other versions retarget this text. */
const MASTER: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...ROLES.apple,
      points: [
        APPLE.lead,
        APPLE.federation,
        APPLE.designSystems,
        APPLE.modernisedAcrossTeams,
        APPLE.mcp,
        APPLE.messaging,
      ],
    },
    {
      ...ROLES.tesla,
      points: [TESLA.led, TESLA.outages, TESLA.federation, TESLA.standards],
    },
    { ...ROLES.rakuten, points: [RAKUTEN.launch] },
    {
      ...ROLES.indeed,
      points: [
        'Managed a cross-functional design technology team of 4, hired 2 design technologists in San Francisco, and ran quarterly and calibration reviews.',
        'Embedded design technologists in product teams to roll out a new design system and its website, and to ship experimental features to weekly A/B tests.',
      ],
    },
    {
      ...ROLES.retail,
      points: [
        'Built and maintained three retail digital-signage products and a WeChat publishing tool, including the Apple Watch demo kiosk in every Apple Store and the Pricing app on display products.',
        RETAIL.locales,
        'Moved the build from Grunt to Gulp and then Webpack, halving local build times, and automated build-to-deployment on Jenkins.',
        'Shipped a shared React framework across the three signage products and improved on-device performance to sustain 4x-resolution assets.',
      ],
    },
    {
      ...ROLES.ebay,
      points: [
        EBAY.prototypes,
        'Contributed animation standards and UI components to the design system, and built the loading spinner that went live on eBay.com.',
      ],
    },
  ],
  headline: 'Lead Software Engineer and Design Technologist',
  languages: LANGUAGES,
  mentoring: MENTORING,
  name: 'Master',
  order: ORDER,
  projects: {
    intro: PROJECTS.where,
    items: [
      [
        { strong: 'Ki.CL platform.' },
        ' My site, built as a federated platform. A React host loads a design-system remote and a typed GraphQL client at runtime, with Apollo Server and MongoDB behind them. Production runs on Cloud Run in two regions behind a global load balancer.',
      ],
      [
        { strong: 'Tree of Life.' },
        ` A walk through the Open Tree of Life's 2.3 million species. Each organism's illustration is generated on demand by a fixed pipeline with provider failover and a vision-model review.`,
      ],
      [
        { strong: 'Image Agent.' },
        ' A public prompt-to-image agent. It asks up to three clarifying questions, reviews each picture with a second model, and runs every request through rate limits, rule checks, moderation and a classifier.',
      ],
      PROJECTS.factoryArm,
    ],
  },
  skills: [
    [
      { strong: 'Front end:' },
      ' TypeScript, React, React Native (Expo), Next.js, Vue, Vite, Webpack, Module Federation, Three.js, WebGL, Sass, Tailwind',
    ],
    [
      { strong: 'Back end:' },
      ' Node.js, GraphQL (Apollo Federation), gRPC, RabbitMQ, MongoDB, SQL, WebSockets, Python',
    ],
    [
      { strong: 'AI:' },
      ' LLM applications on the Claude, OpenAI and Groq APIs, MCP servers, retrieval-augmented generation, structured outputs, evals',
    ],
    SKILLS.platform,
    [
      { strong: 'Design:' },
      ' design systems, component libraries, prototyping, Figma, Sketch, Framer, accessibility, internationalisation',
    ],
  ],
  slug: 'master',
  summary:
    'Design technologist and full-stack engineer with 15+ years of experience in the US and Japan. I build design systems and federated front-end and GraphQL platforms, and I lead the teams that ship them, most recently at Apple and Tesla. I trained in fine art and design, so I work as comfortably with designers as with engineers.',
};

export { MASTER };
