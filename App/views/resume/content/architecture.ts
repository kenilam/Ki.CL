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
        'shared.experience.apple.points.federation',
        'shared.experience.apple.points.messaging',
        'shared.experience.apple.points.mcp',
        'shared.experience.apple.points.designSystems',
        'shared.experience.apple.points.lead',
        'shared.experience.apple.points.modernisedAcrossTeams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.experience.tesla.points.federation',
        'architecture.experience.tesla.points.movedCentralised',
        'shared.experience.tesla.points.outages',
        'architecture.experience.tesla.points.addedRequest',
        'shared.experience.tesla.points.standards',
        'shared.experience.tesla.points.led',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    { ...role('indeed'), points: ['shared.experience.indeed.points.team'] },
    {
      ...role('retail'),
      points: [
        'shared.experience.retail.points.frameworkAndLocales',
        'shared.experience.retail.points.build',
      ],
    },
    { ...role('ebay'), points: ['shared.experience.ebay.points.prototypes'] },
  ],
  headline: 'architecture.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'architecture.name',
  order: ORDER,
  projects: {
    intro: 'shared.projects.intro',
    items: [
      'architecture.projects.items.ki',
      'architecture.projects.items.tree',
      'architecture.projects.items.factory',
      'architecture.projects.items.image',
    ],
  },
  skills: [
    'architecture.skills.architecture',
    'architecture.skills.back',
    'architecture.skills.front',
    'architecture.skills.ai',
    'architecture.skills.platform',
    'architecture.skills.design',
  ],
  slug: 'architecture',
  summary: 'architecture.summary',
};

export { ARCHITECTURE };
