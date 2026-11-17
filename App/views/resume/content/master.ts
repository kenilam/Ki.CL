import type { Version } from './types';

import { EARLIER, EDUCATION, ORDER, role } from './shared';

/** The full record. The other versions retarget this text. */
const MASTER: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'experience.apple.points.lead',
        'experience.apple.points.federation',
        'experience.apple.points.design_systems',
        'experience.apple.points.modernised_across_teams',
        'experience.apple.points.ai_workflows',
        'experience.apple.points.mcp',
        'experience.apple.points.messaging',
        'experience.apple.points.stakeholders',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'experience.tesla.points.led',
        'experience.tesla.points.outages',
        'experience.tesla.points.federation',
        'experience.tesla.points.standards',
        'experience.tesla.points.stakeholders',
      ],
    },
    { ...role('rakuten'), points: ['experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: [
        'experience.indeed.points.team',
        'experience.indeed.points.embedded',
        'experience.indeed.points.ab_testing',
      ],
    },
    {
      ...role('retail'),
      points: [
        'experience.retail.points.built_maintained',
        'experience.retail.points.locales',
        'experience.retail.points.build',
        'experience.retail.points.shipped_shared',
      ],
    },
    {
      ...role('ebay'),
      points: [
        'experience.ebay.points.prototypes',
        'experience.ebay.points.contributed_animation',
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
      'projects.items.ki',
      'projects.items.tree',
      'projects.items.image',
      'projects.items.factory_arm',
    ],
  },
  skills: [
    'skills.ai',
    'skills.back',
    'skills.platform',
    'skills.front',
    'skills.design',
  ],
  slug: 'master',
  summary: 'summary',
};

export { MASTER };
