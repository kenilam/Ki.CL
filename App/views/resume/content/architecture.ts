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
        'shared.apple.federation',
        'shared.apple.messaging',
        'shared.apple.mcp',
        'shared.apple.designSystems',
        'shared.apple.lead',
        'shared.apple.modernisedAcrossTeams',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'shared.tesla.federation',
        'architecture.tesla.movedCentralised',
        'shared.tesla.outages',
        'architecture.tesla.addedRequest',
        'shared.tesla.standards',
        'shared.tesla.led',
      ],
    },
    { ...role('rakuten'), points: ['shared.rakuten.launch'] },
    { ...role('indeed'), points: ['shared.indeed.team'] },
    {
      ...role('retail'),
      points: ['shared.retail.frameworkAndLocales', 'shared.retail.build'],
    },
    { ...role('ebay'), points: ['shared.ebay.prototypes'] },
  ],
  headline: 'architecture.headline',
  languages: 'shared.languages',
  mentoring: 'shared.mentoring',
  name: 'architecture.name',
  order: ORDER,
  projects: {
    intro: 'shared.projects.where',
    items: [
      'architecture.projects.ki',
      'architecture.projects.tree',
      'architecture.projects.factory',
      'architecture.projects.image',
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
