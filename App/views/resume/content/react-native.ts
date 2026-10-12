import type { Version } from './types';

import { EDUCATION, ORDER, role } from './shared';

/** For React Native and product-engineering roles: devices and apps first. */
const REACT_NATIVE: Version = {
  earlier: [
    'react_native.earlier.senior_ui',
    'shared.earlier.apollo',
    'shared.earlier.hasco',
    'react_native.earlier.contract_web',
  ],
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'shared.experience.apple.points.lead',
        'shared.experience.apple.points.design_system',
        'react_native.experience.apple.points.built_module',
        'shared.experience.apple.points.modernised_across_teams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.experience.tesla.points.led',
        'shared.experience.tesla.points.standards',
        'react_native.experience.tesla.points.architected_implemented',
        'react_native.experience.tesla.points.cut_system',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: ['react_native.experience.indeed.points.managed_cross'],
    },
    {
      ...role('retail'),
      points: [
        'react_native.experience.retail.points.built_maintained',
        'react_native.experience.retail.points.shipped_shared',
        'shared.experience.retail.points.locales',
        'shared.experience.retail.points.build',
      ],
    },
    { ...role('ebay'), points: ['shared.experience.ebay.points.prototypes'] },
  ],
  headline: 'react_native.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'react_native.name',
  order: ORDER,
  projects: {
    items: [
      'react_native.projects.items.interpreter',
      'react_native.projects.items.ki',
      'react_native.projects.items.experiments',
    ],
  },
  skills: [
    'react_native.skills.mobile',
    'react_native.skills.native',
    'react_native.skills.back',
    'react_native.skills.ai',
    'shared.skills.platform',
    'shared.skills.design',
  ],
  slug: 'react-native',
  summary: 'react_native.summary',
};

export { REACT_NATIVE };
