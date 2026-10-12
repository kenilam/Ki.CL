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
        'shared.experience.apple.points.federation',
        'shared.experience.apple.points.mcp',
        'shared.experience.apple.points.designSystems',
        'frontendAi.experience.apple.points.leadDesign',
        'shared.experience.apple.points.modernisedAcrossTeams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.experience.tesla.points.federation',
        'shared.experience.tesla.points.outages',
        'shared.experience.tesla.points.standards',
        'shared.experience.tesla.points.led',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    { ...role('indeed'), points: ['shared.experience.indeed.points.team'] },
    {
      ...role('retail'),
      points: [
        'shared.experience.retail.points.frameworkAndLocales',
        'shared.experience.retail.points.build',
      ],
    },
    {
      ...role('ebay'),
      points: [
        'shared.experience.ebay.points.prototypes',
        'frontendAi.experience.ebay.points.builtKiosk',
      ],
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
      'frontendAi.projects.items.image',
      'frontendAi.projects.items.tree',
      'frontendAi.projects.items.writing',
      'shared.projects.items.factoryArm',
      'frontendAi.projects.items.ki',
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
