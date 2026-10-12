import type { Version } from './types';

import { EDUCATION, ORDER, role } from './shared';

/** For React Native and product-engineering roles: devices and apps first. */
const REACT_NATIVE: Version = {
  earlier: [
    'reactNative.earlier.seniorUi',
    'shared.earlier.apollo',
    'shared.earlier.hasco',
    'reactNative.earlier.contractWeb',
  ],
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'shared.experience.apple.points.lead',
        'shared.experience.apple.points.designSystem',
        'reactNative.experience.apple.points.builtModule',
        'shared.experience.apple.points.modernisedAcrossTeams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.experience.tesla.points.led',
        'shared.experience.tesla.points.standards',
        'reactNative.experience.tesla.points.architectedImplemented',
        'reactNative.experience.tesla.points.cutSystem',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: ['reactNative.experience.indeed.points.managedCross'],
    },
    {
      ...role('retail'),
      points: [
        'reactNative.experience.retail.points.builtMaintained',
        'reactNative.experience.retail.points.shippedShared',
        'shared.experience.retail.points.locales',
        'shared.experience.retail.points.build',
      ],
    },
    { ...role('ebay'), points: ['shared.experience.ebay.points.prototypes'] },
  ],
  headline: 'reactNative.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'reactNative.name',
  order: ORDER,
  projects: {
    items: [
      'reactNative.projects.items.interpreter',
      'reactNative.projects.items.ki',
      'reactNative.projects.items.experiments',
    ],
  },
  skills: [
    'reactNative.skills.mobile',
    'reactNative.skills.native',
    'reactNative.skills.back',
    'reactNative.skills.ai',
    'shared.skills.platform',
    'shared.skills.design',
  ],
  slug: 'react-native',
  summary: 'reactNative.summary',
};

export { REACT_NATIVE };
