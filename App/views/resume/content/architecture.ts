import type { Version } from './types';

import {
  APPLE,
  EARLIER,
  EBAY,
  EDUCATION,
  INDEED,
  LANGUAGES,
  MENTORING,
  ORDER,
  PROJECTS,
  RAKUTEN,
  RETAIL,
  ROLES,
  TESLA,
} from './shared';

/** For platform and systems-architecture roles: the systems and their trade-offs first. */
const ARCHITECTURE: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...ROLES.apple,
      points: [
        APPLE.federation,
        APPLE.messaging,
        APPLE.mcp,
        APPLE.designSystems,
        APPLE.lead,
        APPLE.modernisedAcrossTeams,
      ],
    },
    {
      ...ROLES.tesla,
      points: [
        TESLA.federation,
        'Moved a centralised GraphQL platform to a federated gateway with domain-owned subgraphs. The existing schema was mounted as one subgraph so nothing had to move early, and schema checks in CI caught breaking changes before deploy.',
        TESLA.outages,
        'Added request tracing from client to data source with DevOps, so teams could see where a fault started.',
        TESLA.standards,
        TESLA.led,
      ],
    },
    { ...ROLES.rakuten, points: [RAKUTEN.launch] },
    { ...ROLES.indeed, points: [INDEED.team] },
    {
      ...ROLES.retail,
      points: [RETAIL.frameworkAndLocales, RETAIL.build],
    },
    { ...ROLES.ebay, points: [EBAY.prototypes] },
  ],
  headline: 'Staff Software Engineer · Platform and systems architecture',
  languages: LANGUAGES,
  mentoring: MENTORING,
  name: 'Architecture',
  order: ORDER,
  projects: {
    intro: PROJECTS.where,
    items: [
      [
        { strong: 'Ki.CL platform.' },
        ' A React host loads design-system, API-client and experiment remotes at runtime. The GraphQL API (Apollo Server, MongoDB) sits behind a same-origin proxy that injects server-issued keys. Production runs on Cloud Run in two regions behind a global load balancer, with a read replica in the second region. Sessions and read-after-write stay on the primary.',
      ],
      [
        { strong: 'Tree of Life.' },
        ' 2.3 million species cached in MongoDB as a parent-pointer tree, written with idempotent upserts because overlapping lineages race. Illustration is asynchronous: the query returns what exists, and a GraphQL subscription pushes the plate when it lands. Text, image and vision calls each fail over across providers, with timeouts and cooldowns.',
      ],
      [
        { strong: 'Factory Arm.' },
        ' One WebSocket per page carries protobuf frames for every robot, chosen over gRPC-Web because that has no bidirectional streaming. A Rust bridge relays the frames to a digital twin in NVIDIA Isaac Sim and answers "hold still" when the twin is unreachable. The twin leases simulated rigs per session, and its GPU machine stops itself when idle.',
      ],
      [
        { strong: 'Image Agent.' },
        ' A public prompt-to-image agent with a fixed workflow. Every request passes four checks, cheapest first, and quotas are counted in MongoDB so a restart does not reset them. A turn cut short by a restart is closed the next time its thread is read.',
      ],
    ],
  },
  skills: [
    [
      { strong: 'Architecture:' },
      ' federated GraphQL (Apollo Federation), micro-frontends (Module Federation), API gateways and BFFs, messaging (RabbitMQ), gRPC, WebSockets and protobuf, multi-region deployment, request tracing and incident response',
    ],
    [
      { strong: 'Back end:' },
      ' Node.js, GraphQL subscriptions, MongoDB, SQL, Python',
    ],
    [
      { strong: 'Front end:' },
      ' TypeScript, React, Next.js, Vue, Vite, Webpack, Three.js, WebGL, React Native (Expo)',
    ],
    [
      { strong: 'AI:' },
      ' LLM applications on the Claude, OpenAI and Groq APIs, MCP servers, provider failover, moderation and rate limiting',
    ],
    [
      { strong: 'Platform:' },
      ' GCP (Cloud Run, load balancing), Docker, CI/CD with GitHub Actions and Jenkins',
    ],
    [
      { strong: 'Design:' },
      ' design systems, component libraries, accessibility, internationalisation',
    ],
  ],
  slug: 'architecture',
  summary:
    'Staff-level engineer with 15+ years of experience designing platforms that many teams and products share. At Apple I built a federated front end and a GraphQL gateway serving 20+ subgraphs. At Tesla I architected a GraphQL federation layer and front-end infrastructure, and cut system outages from 20+ a week to near zero. I work across the stack, from design systems to multi-region deployment.',
};

export { ARCHITECTURE };
