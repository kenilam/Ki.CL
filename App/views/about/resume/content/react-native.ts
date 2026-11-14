import type { Version } from './types';

import { EDUCATION, ORDER, role } from './shared';

/** For React Native and product-engineering roles: devices and apps first. */
const REACT_NATIVE: Version = {
  earlier: [
    'earlier.senior_ui',
    'earlier.apollo',
    'earlier.hasco',
    'earlier.contract_web',
  ],
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'experience.apple.points.lead',
        'experience.apple.points.design_system',
        'experience.apple.points.federation',
        'experience.apple.points.modernised_across_teams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'experience.tesla.points.led',
        'experience.tesla.points.standards',
        'experience.tesla.points.federation',
        'experience.tesla.points.outages',
      ],
    },
    { ...role('rakuten'), points: ['experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: ['experience.indeed.points.team'],
    },
    {
      ...role('retail'),
      points: [
        'experience.retail.points.built_maintained',
        'experience.retail.points.shipped_shared',
        'experience.retail.points.locales',
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
    items: [
      'projects.items.interpreter',
      'projects.items.ki',
      'projects.items.experiments',
    ],
  },
  skills: [
    'skills.mobile',
    'skills.native',
    'skills.back',
    'skills.ai',
    'skills.platform',
    'skills.design',
  ],
  slug: 'react-native',
  summary: 'summary',
};

export { REACT_NATIVE };
