import type { Version } from './types';

import { EARLIER, EDUCATION, role } from './shared';

/** For engineering-management roles: the teams first, the build second. */
const MANAGER: Version = {
  earlier: EARLIER,
  education: EDUCATION,
  experience: [
    {
      ...role('apple'),
      points: [
        'manager.apple.leadDesign',
        'manager.apple.builtPlatform',
        'shared.apple.designSystem',
        'shared.apple.modernised',
        'manager.apple.builtMcp',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'manager.tesla.managedMentored',
        'manager.tesla.cutSystem',
        'manager.tesla.wonAdoption',
        'manager.tesla.extendedSupport',
        'shared.tesla.standards',
      ],
    },
    { ...role('rakuten'), points: ['shared.rakuten.launch'] },
    {
      ...role('indeed'),
      points: [
        'manager.indeed.managedCross',
        'manager.indeed.hired2',
        'manager.indeed.ranQuarterly',
        'manager.indeed.embeddedTeam',
        'manager.indeed.plannedTimelines',
      ],
    },
    {
      ...role('retail'),
      points: [
        'manager.retail.oversawThree',
        'manager.retail.helpedOnboard',
        'shared.retail.build',
      ],
    },
    { ...role('ebay'), points: ['manager.ebay.uxPartner'] },
  ],
  headline: 'manager.headline',
  languages: 'shared.languages',
  mentoring: 'manager.mentoring',
  name: 'manager.name',
  order: [
    'summary',
    'experience',
    'mentoring',
    'projects',
    'skills',
    'education',
    'languages',
  ],
  projects: { intro: 'manager.projects.intro' },
  skills: [
    'manager.skills.leadership',
    'manager.skills.engineering',
    'manager.skills.ai',
  ],
  slug: 'manager',
  summary: 'manager.summary',
};

export { MANAGER };
