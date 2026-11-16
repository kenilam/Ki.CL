import React from 'react';

import classNames from 'classnames';

import { List } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import { Line } from '@/views/about/resume/page/article/timeline/line';

const Lines: React.FunctionComponent = () => {
  const { earlier } = useVersion();

  return (
    <List
      className={classNames(
        'kicl-max-inline-size-columns-5',
        'kicl-scroll-focus-color-a80'
      )}
      gap='narrow'
      listStyleType='disc'
    >
      {earlier.map((line) => {
        return <Line key={line} line={line} />;
      })}
    </List>
  );
};

export { Lines };
