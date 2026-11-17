import { FILE } from '@/views/resume/constants';
import { EXPERIMENTS, PAGES, TOPICS } from '@/views/routes';

import { ORIGIN } from './constants';
import * as Words from './words';

const link = (path: string, name: string, note?: string) => {
  const target = `- [${name}](${ORIGIN}${path})`;

  return note ? `${target}: ${Words.fill(note)}` : target;
};

const llms = () => {
  return [
    `# ${Words.SERVER.document_title}`,
    '',
    `> ${Words.SERVER.document_description}`,
    '',
    link(PAGES.home, Words.COMMON.home, Words.HOME.title),
    link(PAGES.about, Words.COMMON.about, Words.ABOUT.lead),
    link(PAGES.resume, Words.COMMON.resume, Words.RESUME.headline_master),
    link(FILE, Words.fill(Words.RESUME.print_title)),
    '',
    `## ${Words.COMMON.experiments}`,
    '',
    link(PAGES.experiments, Words.COMMON.experiments),
    ...EXPERIMENTS.map(({ context, to }) => {
      return link(
        to,
        Words.COMMON[`experiment_${context}`],
        Words.EXPERIMENTS[`description_${context}`]
      );
    }),
    '',
    `## ${Words.COMMON.workshop}`,
    '',
    link(PAGES.workshop, Words.COMMON.workshop),
    ...TOPICS.map(({ context, to }) => {
      return link(
        to,
        Words.COMMON[context],
        Words.WORKSHOP[`description_${context}`]
      );
    }),
    '',
  ].join('\n');
};

export { llms };
