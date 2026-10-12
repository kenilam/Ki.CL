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
        'manager.experience.apple.points.lead_design',
        'manager.experience.apple.points.built_platform',
        'shared.experience.apple.points.design_system',
        'shared.experience.apple.points.modernised',
        'manager.experience.apple.points.built_mcp',
      ],
    },
    {
      ...role('tesla'),
      points: [
        'manager.experience.tesla.points.managed_mentored',
        'manager.experience.tesla.points.cut_system',
        'manager.experience.tesla.points.won_adoption',
        'manager.experience.tesla.points.extended_support',
        'shared.experience.tesla.points.standards',
      ],
    },
    { ...role('rakuten'), points: ['shared.experience.rakuten.points.launch'] },
    {
      ...role('indeed'),
      points: [
        'manager.experience.indeed.points.managed_cross',
        'manager.experience.indeed.points.hired_2',
        'manager.experience.indeed.points.ran_quarterly',
        'manager.experience.indeed.points.embedded_team',
        'manager.experience.indeed.points.planned_timelines',
      ],
    },
    {
      ...role('retail'),
      points: [
        'manager.experience.retail.points.oversaw_three',
        'manager.experience.retail.points.helped_onboard',
        'shared.experience.retail.points.build',
      ],
    },
    { ...role('ebay'), points: ['manager.experience.ebay.points.ux_partner'] },
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
