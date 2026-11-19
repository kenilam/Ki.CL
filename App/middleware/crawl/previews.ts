import { EXPERIMENTS, PAGES, POSTS, TOPICS } from '@/views/routes';

import * as Words from './words';

type Preview = {
  description: string;
  section: string;
  title: string;
  to: string;
  type?: 'article';
};

const HOME: Preview = {
  description: Words.SERVER.document_description,
  section: Words.COMMON.name,
  title: Words.HOME.title,
  to: PAGES.home,
};

/** A page inside a section comes before the section, which would match it too. */
const PREVIEWS: readonly Preview[] = [
  ...POSTS.map(({ context, to }) => ({
    description: Words.BLOG[`description_${context}`],
    section: Words.COMMON.blog,
    title: Words.BLOG[`title_${context}`],
    to,
    type: 'article' as const,
  })),
  ...EXPERIMENTS.map(({ context, to }) => ({
    description: Words.fill(Words.EXPERIMENTS[`description_${context}`]),
    section: Words.COMMON.experiments,
    title: Words.COMMON[`experiment_${context}`],
    to,
  })),
  ...TOPICS.map(({ context, to }) => ({
    description: Words.WORKSHOP[`description_${context}`],
    section: Words.COMMON.workshop,
    title: Words.COMMON[context],
    to,
  })),
  {
    description: Words.ABOUT.lead,
    section: Words.COMMON.about,
    title: Words.HOME.title_about,
    to: PAGES.about,
  },
  {
    description: Words.SERVER.document_description,
    section: Words.COMMON.name,
    title: Words.COMMON.blog,
    to: PAGES.blog,
  },
  {
    description: Words.HOME.tagline,
    section: Words.COMMON.name,
    title: Words.COMMON.experiments,
    to: PAGES.experiments,
  },
  {
    description: Words.RESUME.headline_master,
    section: Words.COMMON.resume,
    title: Words.COMMON.name,
    to: PAGES.resume,
  },
  {
    description: Words.HOME.workshop.replaceAll('**', ''),
    section: Words.COMMON.name,
    title: Words.COMMON.workshop,
    to: PAGES.workshop,
  },
  HOME,
];

const preview = (path: string) => {
  return (
    PREVIEWS.find(({ to }) => path === to || path.startsWith(`${to}/`)) ?? HOME
  );
};

export { PREVIEWS, preview, type Preview };
