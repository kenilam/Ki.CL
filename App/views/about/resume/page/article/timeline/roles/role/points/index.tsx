import React from 'react';

import { List } from 'design/components';

import { Line } from '@/views/about/resume/page/article/timeline/line';

import { useVersion } from '@/views/about/resume/context';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

const Points: React.FunctionComponent<Props> = ({ id }) => {
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  return (
    <List
      className='kicl-scroll-focus-color-a80'
      gap='narrow'
      listStyleType='disc'
    >
      {role.points.map((line) => {
        return <Line key={line} line={line} />;
      })}
    </List>
  );
};

export { Points };
