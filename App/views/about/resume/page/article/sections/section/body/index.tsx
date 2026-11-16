import React from 'react';

import type { Props } from '@/views/about/resume/page/article/sections/section';

import { Education } from './education';
import { Languages } from './languages';
import { Mentoring } from './mentoring';
import { Projects } from './projects';
import { Skills } from './skills';

const BODIES: Record<Props['id'], React.ReactElement> = {
  education: <Education />,
  languages: <Languages />,
  mentoring: <Mentoring />,
  projects: <Projects />,
  skills: <Skills />,
};

const Body: React.FunctionComponent<Props> = ({ id }) => {
  return BODIES[id];
};

export { Body };
