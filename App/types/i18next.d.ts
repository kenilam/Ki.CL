import 'i18next';

import type common from '@/locales/en/common.json';
import type daylight from '@/locales/en/daylight.json';
import type experiments from '@/locales/en/experiments.json';
import type factoryArm from '@/locales/en/factory-arm.json';
import type home from '@/locales/en/home.json';
import type imageAgent from '@/locales/en/image-agent.json';
import type me from '@/locales/en/me.json';
import type musicVisualiser from '@/locales/en/music-visualiser.json';
import type portfolio from '@/locales/en/portfolio.json';
import type resume from '@/locales/en/resume.json';
import type treeOfLife from '@/locales/en/tree-of-life.json';
import type workshop from '@/locales/en/workshop.json';

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
      me: typeof me;
      'music-visualiser': typeof musicVisualiser;
      portfolio: typeof portfolio;
      resume: typeof resume;
      'tree-of-life': typeof treeOfLife;
      workshop: typeof workshop;
    };
  }
}
