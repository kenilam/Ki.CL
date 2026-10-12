import type { Version } from './types';

import { EARLIER, EDUCATION, ORDER, role } from './shared';

/** For platform and systems-architecture roles: the systems and their trade-offs first. */
const ARCHITECTURE: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'experience.apple.points.federation',
        'experience.apple.points.messaging',
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
        'experience.tesla.points.moved_centralised',
        'experience.tesla.points.outages',
        'experience.tesla.points.added_request',
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
    { ...role('ebay'), points: ['experience.ebay.points.prototypes'] },
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
      'projects.items.factory',
      'projects.items.image',
    ],
  },
  skills: [
    'skills.architecture',
    'skills.back',
    'skills.front',
    'skills.ai',
    'skills.platform',
    'skills.design',
  ],
  slug: 'architecture',
  summary: 'summary',
};

export { ARCHITECTURE };
