import React from 'react';

import classNames from 'classnames';

import { List } from 'design/components';
import { useResponsive } from 'design/hooks';

import { TOPICS } from '@/views/routes';

import { Topic } from './topic';

const FILLS = {
  true: 12,
  false: 4,
} as const;

const Topics: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();

  return (
    <List
      className={classNames(
        'kicl-inline-size-full',
        'kicl-max-inline-size-columns-8'
      )}
      fill={FILLS[String(isNarrow)]}
      gap='normal'
      justifyItems='center'
    >
      {TOPICS.map(({ to }) => {
        return <Topic key={to} to={to} />;
      })}
    </List>
  );
};

export { Topics };
