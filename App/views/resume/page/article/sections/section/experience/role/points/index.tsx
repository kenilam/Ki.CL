import React from 'react';

// Components
import { List } from 'design/components';

// Content
import type { Resolved } from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Line } from '@/views/resume/page/article/sections/section/line';

type Props = Pick<Resolved['experience'][number], 'dates'>;

const Points: React.FunctionComponent<Props> = ({ dates }) => {
  const role = useVersion().experience.find((each) => {
    return each.dates === dates;
  });

  if (!role) {
    return null;
  }

  return (
    <List gap='narrow' listStyleType='inherit'>
      {role.points.map((line) => {
        return <Line key={line} line={line} />;
      })}
    </List>
  );
};

export { Points };
