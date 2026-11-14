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
        'experience.apple.points.lead',
        'experience.apple.points.federation',
        'experience.apple.points.design_system',
        'experience.apple.points.modernised',
        'experience.apple.points.mcp',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'experience.tesla.points.led',
        'experience.tesla.points.outages',
        'experience.tesla.points.won_adoption',
        'experience.tesla.points.extended_support',
        'experience.tesla.points.standards',
      ],
    },
    { ...role('rakuten'), points: ['experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: [
        'experience.indeed.points.team',
        'experience.indeed.points.hired_2',
        'experience.indeed.points.ran_quarterly',
        'experience.indeed.points.embedded',
        'experience.indeed.points.planned_timelines',
      ],
    },
    {
      ...role('retail'),
      points: [
        'experience.retail.points.oversaw_three',
        'experience.retail.points.helped_onboard',
        'experience.retail.points.build',
      ],
    },
    { ...role('ebay'), points: ['experience.ebay.points.prototypes'] },
  ],
  headline: 'headline',
  languages: 'languages',
  mentoring: 'mentoring',
  name: 'name',
  order: [
    'summary',
    'experience',
    'mentoring',
    'projects',
    'skills',
    'education',
    'languages',
  ],
  projects: { intro: 'projects.intro' },
  skills: ['skills.leadership', 'skills.engineering', 'skills.ai'],
  slug: 'manager',
  summary: 'summary',
};

export { MANAGER };
