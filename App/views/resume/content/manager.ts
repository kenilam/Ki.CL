import type { Version } from './types';

import {
  APPLE,
  EARLIER,
  EDUCATION,
  LANGUAGES,
  LINKS,
  RAKUTEN,
  RETAIL,
  ROLES,
  TESLA,
} from './shared';

/** For engineering-management roles: the teams first, the build second. */
const MANAGER: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...ROLES.apple,
      points: [
        `Lead design and engineering for Apple University's cross-platform ecosystem, partnering with product, design and engineering stakeholders across distributed teams.`,
        `Built the platform's architecture: a Module Federation front end and an Apollo Federation gateway serving 20+ subgraphs, with 10+ federated mini-apps consuming the component library and the federated graph.`,
        APPLE.designSystem,
        APPLE.modernised,
        'Built an MCP server that lets non-technical owners build a proof of concept from the component library and gateway schemas, and deploy it to an isolated sandbox.',
      ],
    },
    {
      ...ROLES.tesla,
      points: [
        `Managed and mentored an 8-person cross-functional team while leading UI/UX engineering for Tesla Energy's Solar platform.`,
        'Cut system outages from 20+ a week to near zero. Led the diagnosis of a platform-wide failure, added request tracing with DevOps, and set up a formal on-call rotation and an incident taxonomy.',
        'Won adoption of a GraphQL federation layer across teams I did not manage, by migrating one team first and letting the others opt in.',
        'Extended support across time zones, with engineers in Singapore, Japan, China and Berlin alongside the San Jose core.',
        TESLA.standards,
      ],
    },
    { ...ROLES.rakuten, points: [RAKUTEN.launch] },
    {
      ...ROLES.indeed,
      points: [
        `Managed a cross-functional design technology team of 4 that built prototypes and experiments for Indeed's products.`,
        'Hired 2 design technologists in San Francisco and opened requisitions for UI and front-end roles in Mountain View.',
        'Ran quarterly and calibration reviews.',
        'Embedded team members with product teams to roll out a new design system and its website, build components for Indeed Inbox, and run A/B tests with the Job Alert and Email team.',
        'Planned timelines, technology and staffing for prototypes that went to user testing and then to engineering.',
      ],
    },
    {
      ...ROLES.retail,
      points: [
        'Oversaw three retail digital-signage products and a WeChat publishing tool, rolling out features and content to 30+ locales at every major product launch.',
        'Helped onboard vendors and mentored them through the handover.',
        RETAIL.build,
      ],
    },
    {
      ...ROLES.ebay,
      points: [
        'UX partner to product teams on the search results page, the item page and the design system. A left-nav redesign raised engagement on third-level categories by 2% in Q4 2014.',
      ],
    },
  ],
  headline: 'Engineering Manager and Staff Software Engineer',
  languages: LANGUAGES,
  mentoring: [
    'ADPList mentor: 426 sessions and 21,000 minutes, 52 reviews, and in the top 10% of contributors in my field. Sessions cover front-end and design problems, general mentorship and turning ideas into businesses. ',
    LINKS.adplist,
  ],
  name: 'Manager',
  order: [
    'summary',
    'experience',
    'mentoring',
    'projects',
    'skills',
    'education',
    'languages',
  ],
  projects: {
    intro: [
      'I still build in my own time: Tree of Life, Image Agent and Factory Arm at ',
      LINKS.experiments,
      ', on a federated React and GraphQL platform that runs on Cloud Run in two regions. Code is at ',
      LINKS.github,
      '.',
    ],
  },
  skills: [
    [
      { strong: 'Leadership:' },
      ' people management, hiring, quarterly and calibration reviews, mentoring, on-call and incident process, stakeholder management, cross-team architecture',
    ],
    [
      { strong: 'Engineering:' },
      ' TypeScript, React, Node.js, GraphQL (Apollo Federation), Module Federation, design systems, GCP, CI/CD',
    ],
    [{ strong: 'AI:' }, ' LLM applications, MCP servers'],
  ],
  slug: 'manager',
  summary: `Engineering manager and staff engineer with 15+ years of experience in front-end platforms and design systems. I managed an 8-person team at Tesla and a team of 4 at Indeed, where I also hired and ran quarterly and calibration reviews. I still build, currently leading design and engineering for Apple University's platform, and I mentor through ADPList, with 426 sessions so far.`,
};

export { MANAGER };
