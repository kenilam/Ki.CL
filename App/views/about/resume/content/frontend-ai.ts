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
        'experience.apple.points.federation',
        'experience.apple.points.mcp',
        'experience.apple.points.design_systems',
        'experience.apple.points.lead',
        'experience.apple.points.modernised_across_teams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'experience.tesla.points.federation',
        'experience.tesla.points.outages',
        'experience.tesla.points.standards',
        'experience.tesla.points.led',
      ],
    },
    { ...role('rakuten'), points: ['experience.rakuten.points.launch'] },
    { ...role('indeed'), points: ['experience.indeed.points.team'] },
    {
      ...role('retail'),
      points: [
        'experience.retail.points.framework_and_locales',
        'experience.retail.points.build',
      ],
    },
    {
      ...role('ebay'),
      points: [
        'experience.ebay.points.prototypes',
        'experience.ebay.points.built_kiosk',
      ],
    },
  ],
  headline: 'headline',
  languages: 'languages',
  mentoring: 'mentoring',
  name: 'name',
  order: ORDER,
  projects: {
    intro: 'projects.intro',
    items: [
      'projects.items.image',
      'projects.items.tree',
      'projects.items.writing',
      'projects.items.factory_arm',
      'projects.items.ki',
    ],
  },
  skills: [
    'skills.ai',
    'skills.front',
    'skills.back',
    'skills.platform',
    'skills.design',
  ],
  slug: 'frontend-ai',
  summary: 'summary',
};

export { FRONTEND_AI };
