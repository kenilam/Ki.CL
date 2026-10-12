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
        'shared.experience.apple.points.lead',
        'shared.experience.apple.points.federation',
        'shared.experience.apple.points.designSystems',
        'shared.experience.apple.points.modernisedAcrossTeams',
        'shared.experience.apple.points.mcp',
        'shared.experience.apple.points.messaging',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.experience.tesla.points.led',
        'shared.experience.tesla.points.outages',
        'shared.experience.tesla.points.federation',
        'shared.experience.tesla.points.standards',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: [
        'master.experience.indeed.points.managedCross',
        'master.experience.indeed.points.embeddedDesign',
      ],
    },
    {
      ...role('retail'),
      points: [
        'master.experience.retail.points.builtMaintained',
        'shared.experience.retail.points.locales',
        'master.experience.retail.points.movedBuild',
        'master.experience.retail.points.shippedShared',
      ],
    },
    {
      ...role('ebay'),
      points: [
        'shared.experience.ebay.points.prototypes',
        'master.experience.ebay.points.contributedAnimation',
      ],
    },
  ],
  headline: 'master.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'master.name',
  order: ORDER,
  projects: {
    intro: 'shared.projects.intro',
    items: [
      'master.projects.items.ki',
      'master.projects.items.tree',
      'master.projects.items.image',
      'shared.projects.items.factoryArm',
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
