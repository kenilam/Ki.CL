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
        'manager.experience.apple.points.leadDesign',
        'manager.experience.apple.points.builtPlatform',
        'shared.experience.apple.points.designSystem',
        'shared.experience.apple.points.modernised',
        'manager.experience.apple.points.builtMcp',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'manager.experience.tesla.points.managedMentored',
        'manager.experience.tesla.points.cutSystem',
        'manager.experience.tesla.points.wonAdoption',
        'manager.experience.tesla.points.extendedSupport',
        'shared.experience.tesla.points.standards',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: [
        'manager.experience.indeed.points.managedCross',
        'manager.experience.indeed.points.hired2',
        'manager.experience.indeed.points.ranQuarterly',
        'manager.experience.indeed.points.embeddedTeam',
        'manager.experience.indeed.points.plannedTimelines',
      ],
    },
    {
      ...role('retail'),
      points: [
        'manager.experience.retail.points.oversawThree',
        'manager.experience.retail.points.helpedOnboard',
        'shared.experience.retail.points.build',
      ],
    },
    { ...role('ebay'), points: ['manager.experience.ebay.points.uxPartner'] },
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
