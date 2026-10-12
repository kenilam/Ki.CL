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
        'shared.experience.apple.points.design_systems',
        'shared.experience.apple.points.modernised_across_teams',
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
        'master.experience.indeed.points.managed_cross',
        'master.experience.indeed.points.embedded_design',
      ],
    },
    {
      ...role('retail'),
      points: [
        'master.experience.retail.points.built_maintained',
        'shared.experience.retail.points.locales',
        'master.experience.retail.points.moved_build',
        'master.experience.retail.points.shipped_shared',
      ],
    },
    {
      ...role('ebay'),
      points: [
        'shared.experience.ebay.points.prototypes',
        'master.experience.ebay.points.contributed_animation',
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
      'shared.projects.items.factory_arm',
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
