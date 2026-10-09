import type { Version } from './types';

import {
  APPLE,
  EBAY,
  EDUCATION,
  LANGUAGES,
  LINKS,
  MENTORING,
  ORDER,
  RAKUTEN,
  RETAIL,
  ROLES,
  SKILLS,
  TESLA,
} from './shared';

/** For React Native and product-engineering roles: devices and apps first. */
const REACT_NATIVE: Version = {
  earlier: [
    'Senior UI Developer, Apple (contract via Tech Mahindra) · May 2013 – Jan 2014. UI and iOS application development with Objective-C and AngularJS.',
    'UI Developer, Apollo Group · Apr 2012 – May 2013',
    'Web and Product Designer, Hasco Enterprise, Osaka · Nov 2010 – Aug 2011',
    'Contract Web Designer, Le Ciel Bleu · Aug 2009 – Oct 2010. Brand sites, e-commerce and a native iPhone app.',
  ],
  education: EDUCATION,
  experience: [
    {
      ...ROLES.apple,
      points: [
        APPLE.lead,
        APPLE.designSystem,
        'Built a Module Federation front end and an Apollo Federation gateway serving 20+ subgraphs. 10+ federated mini-apps consume the component library and the federated graph.',
        APPLE.modernisedAcrossTeams,
      ],
    },
    {
      ...ROLES.tesla,
      points: [
        TESLA.led,
        TESLA.standards,
        'Architected and implemented a GraphQL federation layer and Vite-based front-end infrastructure for modular development.',
        'Cut system outages from 20+ a week to near zero.',
      ],
    },
    { ...ROLES.rakuten, points: [RAKUTEN.launch] },
    {
      ...ROLES.indeed,
      points: [
        'Managed a cross-functional design technology team of 4, embedding design technologists in product teams to roll out a new design system and ship weekly A/B tests.',
      ],
    },
    {
      ...ROLES.retail,
      points: [
        'Built and maintained three retail digital-signage products: the Apple Watch demo, an iPad kiosk in every Apple Store; the Pricing app, which runs on display products in Apple Stores and channel stores; and Channel Digital for channel stores.',
        'Shipped a shared React framework across all three, and improved on-device performance of the kiosk and the Pricing app to sustain 4x-resolution assets.',
        RETAIL.locales,
        RETAIL.build,
      ],
    },
    { ...ROLES.ebay, points: [EBAY.prototypes] },
  ],
  headline: 'Lead Product Engineer · React, React Native and design systems',
  languages: LANGUAGES,
  mentoring: MENTORING,
  name: 'React Native',
  order: ORDER,
  projects: {
    items: [
      [
        { strong: 'Interpreter (prototype).' },
        ` A speech interpreter for two-way conversation. The Expo app (React Native, Tamagui) records push-to-talk audio and sends each utterance over a WebSocket to a Fastify server. The server detects the speaker's language, translates with Claude using the conversation so far, and streams captions back. The phone then speaks the result on-device. 21 languages, including Cantonese and Mandarin.`,
      ],
      [
        { strong: 'Ki.CL platform.' },
        ' My site, built as a federated platform. A React host loads a design-system remote and a typed GraphQL client at runtime, and production runs on Cloud Run in two regions behind a global load balancer.',
      ],
      [
        { strong: 'Experiments.' },
        ' Tree of Life, Image Agent and Factory Arm, live at ',
        LINKS.experiments,
        ', with code at ',
        LINKS.github,
        '.',
      ],
    ],
  },
  skills: [
    [
      { strong: 'Mobile and front end:' },
      ' React Native, Expo, Tamagui, TypeScript, React, Next.js, Vite, Webpack, Module Federation, Three.js',
    ],
    [{ strong: 'Native iOS, earlier work:' }, ' Objective-C'],
    [
      { strong: 'Back end:' },
      ' Node.js, GraphQL (Apollo Federation), WebSockets, MongoDB, SQL, gRPC, RabbitMQ',
    ],
    [
      { strong: 'AI:' },
      ' LLM applications on the Claude and OpenAI APIs, MCP servers',
    ],
    SKILLS.platform,
    SKILLS.design,
  ],
  slug: 'react-native',
  summary:
    'Product engineer with 15+ years of experience building interfaces, from the iPad kiosk in every Apple Store to the platform behind Apple University. React and TypeScript are my daily tools on the web. I build with React Native and Expo in my own apps, and I did native iOS work earlier in my career. I managed teams at Tesla and Indeed, and I trained in fine art and design.',
};

export { REACT_NATIVE };
