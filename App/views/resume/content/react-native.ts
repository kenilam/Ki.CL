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
        'shared.apple.lead',
        'shared.apple.designSystem',
        'reactNative.apple.builtModule',
        'shared.apple.modernisedAcrossTeams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.tesla.led',
        'shared.tesla.standards',
        'reactNative.tesla.architectedImplemented',
        'reactNative.tesla.cutSystem',
      ],
    },
    { ...role('rakuten'), points: ['shared.rakuten.launch'] },
    { ...role('indeed'), points: ['reactNative.indeed.managedCross'] },
    {
      ...role('retail'),
      points: [
        'reactNative.retail.builtMaintained',
        'reactNative.retail.shippedShared',
        'shared.retail.locales',
        'shared.retail.build',
      ],
    },
    { ...role('ebay'), points: ['shared.ebay.prototypes'] },
  ],
  headline: 'reactNative.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'reactNative.name',
  order: ORDER,
  projects: {
    items: [
      'reactNative.projects.interpreter',
      'reactNative.projects.ki',
      'reactNative.projects.experiments',
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
