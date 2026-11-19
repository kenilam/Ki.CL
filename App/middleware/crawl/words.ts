import ABOUT from '@/locales/en-US/about.json';
import BLOG from '@/locales/en-US/blog.json';
import COMMON from '@/locales/en-US/common.json';
import EXPERIMENTS from '@/locales/en-US/experiments.json';
import HOME from '@/locales/en-US/home.json';
import RESUME from '@/locales/en-US/resume.json';
import SERVER from '@/locales/en-US/server.json';
import WORKSHOP from '@/locales/en-US/workshop.json';
import { SCENES } from '@/views/experiments/music-visualiser/spec';

const VALUES = new Map([
  ['name', COMMON.name],
  ['scenes', String(SCENES.length)],
]);

const fill = (text: string) => {
  return text
    .replace(/\$t\(common:(\w+)\)/g, (_, key: keyof typeof COMMON) => {
      return COMMON[key];
    })
    .replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
      return VALUES.get(key) ?? match;
    });
};

export {
  ABOUT,
  BLOG,
  COMMON,
  EXPERIMENTS,
  HOME,
  RESUME,
  SERVER,
  WORKSHOP,
  fill,
};
