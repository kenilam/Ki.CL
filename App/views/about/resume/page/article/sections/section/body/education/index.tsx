import React from 'react';

import classNames from 'classnames';

import { List } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import { Degree } from './degree';

const Education: React.FunctionComponent = () => {
  const { education } = useVersion();

  return (
    <List
      className={classNames(
        'kicl-max-inline-size-columns-8',
        'kicl-scroll-enter-near'
      )}
      gap='narrow'
      listStyleType='disc'
    >
      {education.map((line) => {
        return <Degree key={line} line={line} />;
      })}
    </List>
  );
};

export { Education };
