import 'i18next';

import type common from '@/locales/en-US/common.json';
import type daylight from '@/locales/en-US/daylight.json';
import type experiments from '@/locales/en-US/experiments.json';
import type factoryArm from '@/locales/en-US/factory-arm.json';
import type home from '@/locales/en-US/home.json';
import type imageAgent from '@/locales/en-US/image-agent.json';
import type internationalisation from '@/locales/en-US/internationalisation.json';
import type me from '@/locales/en-US/me.json';
import type musicVisualiser from '@/locales/en-US/music-visualiser.json';
import type portfolio from '@/locales/en-US/portfolio.json';
import type resume from '@/locales/en-US/resume.json';
import type treeOfLife from '@/locales/en-US/tree-of-life.json';
import type workshop from '@/locales/en-US/workshop.json';

/** Keys are checked against the English files, which seed the database. */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      daylight: typeof daylight;
      experiments: typeof experiments;
      'factory-arm': typeof factoryArm;
      home: typeof home;
      'image-agent': typeof imageAgent;
      internationalisation: typeof internationalisation;
      me: typeof me;
      'music-visualiser': typeof musicVisualiser;
      portfolio: typeof portfolio;
      resume: typeof resume;
      'tree-of-life': typeof treeOfLife;
      workshop: typeof workshop;
    };
  }
}
