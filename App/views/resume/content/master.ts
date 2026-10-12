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
        'shared.apple.lead',
        'shared.apple.federation',
        'shared.apple.designSystems',
        'shared.apple.modernisedAcrossTeams',
        'shared.apple.mcp',
        'shared.apple.messaging',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.tesla.led',
        'shared.tesla.outages',
        'shared.tesla.federation',
        'shared.tesla.standards',
      ],
    },
    { ...role('rakuten'), points: ['shared.rakuten.launch'] },
    {
      ...role('indeed'),
      points: ['master.indeed.managedCross', 'master.indeed.embeddedDesign'],
    },
    {
      ...role('retail'),
      points: [
        'master.retail.builtMaintained',
        'shared.retail.locales',
        'master.retail.movedBuild',
        'master.retail.shippedShared',
      ],
    },
    {
      ...role('ebay'),
      points: ['shared.ebay.prototypes', 'master.ebay.contributedAnimation'],
    },
  ],
  headline: 'master.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'master.name',
  order: ORDER,
  projects: {
    intro: 'shared.projects.where',
    items: [
      'master.projects.ki',
      'master.projects.tree',
      'master.projects.image',
      'shared.projects.factoryArm',
    ],
  },
  skills: [
    'master.skills.front',
    'master.skills.back',
    'master.skills.ai',
    'shared.skills.platform',
    'master.skills.design',
  ],
  slug: 'master',
  summary: 'master.summary',
};

export { MASTER };
