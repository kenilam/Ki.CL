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
        'shared.experience.apple.points.design_systems',
        'frontend_ai.experience.apple.points.lead_design',
        'shared.experience.apple.points.modernised_across_teams',
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
        'shared.experience.retail.points.framework_and_locales',
        'shared.experience.retail.points.build',
      ],
    },
    {
      ...role('ebay'),
      points: [
        'shared.experience.ebay.points.prototypes',
        'frontend_ai.experience.ebay.points.built_kiosk',
      ],
    },
  ],
  headline: 'frontend_ai.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'frontend_ai.name',
  order: ORDER,
  projects: {
    intro: 'frontend_ai.projects.intro',
    items: [
      'frontend_ai.projects.items.image',
      'frontend_ai.projects.items.tree',
      'frontend_ai.projects.items.writing',
      'shared.projects.items.factory_arm',
      'frontend_ai.projects.items.ki',
    ],
  },
  skills: [
    'frontend_ai.skills.ai',
    'frontend_ai.skills.front',
    'frontend_ai.skills.back',
    'shared.skills.platform',
    'shared.skills.design',
  ],
  slug: 'frontend-ai',
  summary: 'frontend_ai.summary',
};

export { FRONTEND_AI };
