import React from 'react';

// Content
import type { SectionId } from '@/views/resume/content';

// Partials
import { Education } from './education';
import { Experience } from './experience';
import { Languages } from './languages';
import { Mentoring } from './mentoring';
import { Projects } from './projects';
import { Skills } from './skills';
import { Summary } from './summary';

type Props = { id: SectionId };

const SECTIONS: Record<SectionId, React.FunctionComponent> = {
  education: Education,
  experience: Experience,
  languages: Languages,
  mentoring: Mentoring,
  projects: Projects,
  skills: Skills,
  summary: Summary,
};

const Section: React.FunctionComponent<Props> = ({ id }) => {
  const Component = SECTIONS[id];

  return <Component />;
};

export { Section };
