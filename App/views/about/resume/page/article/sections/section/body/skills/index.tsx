import React from 'react';

import classNames from 'classnames';

import { List } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import { Skill } from './skill';

const Skills: React.FunctionComponent = () => {
  const { skills } = useVersion();

  return (
    <List
      className={classNames(
        'kicl-max-inline-size-columns-8',
        'kicl-scroll-enter-near'
      )}
      gap='narrow'
      listStyleType='disc'
    >
      {skills.map((line) => {
        return <Skill key={line} line={line} />;
      })}
    </List>
  );
};

export { Skills };
