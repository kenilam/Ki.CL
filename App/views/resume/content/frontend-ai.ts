import type { Version } from './types';

import { EARLIER, EDUCATION, ORDER, role } from './shared';

/** For front-end and AI product roles: federation and the agents first. */
const FRONTEND_AI: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'shared.apple.federation',
        'shared.apple.mcp',
        'shared.apple.designSystems',
        'frontendAi.apple.leadDesign',
        'shared.apple.modernisedAcrossTeams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.tesla.federation',
        'shared.tesla.outages',
        'shared.tesla.standards',
        'shared.tesla.led',
      ],
    },
    { ...role('rakuten'), points: ['shared.rakuten.launch'] },
    { ...role('indeed'), points: ['shared.indeed.team'] },
    {
      ...role('retail'),
      points: ['shared.retail.frameworkAndLocales', 'shared.retail.build'],
    },
    {
      ...role('ebay'),
      points: ['shared.ebay.prototypes', 'frontendAi.ebay.builtKiosk'],
    },
  ],
  headline: 'frontendAi.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'frontendAi.name',
  order: ORDER,
  projects: {
    intro: 'frontendAi.projects.intro',
    items: [
      'frontendAi.projects.image',
      'frontendAi.projects.tree',
      'frontendAi.projects.writing',
      'shared.projects.factoryArm',
      'frontendAi.projects.ki',
    ],
  },
  skills: [
    'frontendAi.skills.ai',
    'frontendAi.skills.front',
    'frontendAi.skills.back',
    'shared.skills.platform',
    'shared.skills.design',
  ],
  slug: 'frontend-ai',
  summary: 'frontendAi.summary',
};

export { FRONTEND_AI };
