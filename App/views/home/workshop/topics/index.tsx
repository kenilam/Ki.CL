import React from 'react';

import { List } from 'design/components';

import { TOPICS } from '@/views/routes';

import { Topic } from './topic';

import './styles.scss';

import { CLASS_NAME } from './constants';

const Topics: React.FunctionComponent = () => {
  return (
    <List className={CLASS_NAME} fill={4} gap='normal'>
      {TOPICS.map(({ to }) => {
        return <Topic key={to} to={to} />;
      })}
    </List>
  );
};

export { Topics };
