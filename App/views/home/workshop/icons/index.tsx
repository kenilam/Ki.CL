import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { TOPICS } from '@/views/routes';

import { Icon } from './icon';

import './styles.scss';

import { CLASS_NAME } from './constants';

const Icons: React.FunctionComponent = () => {
  return (
    <Layout
      alignItems='center'
      display='flex'
      gap='wide'
      justifyContent='center'
    >
      <span
        aria-hidden
        className={classNames(CLASS_NAME, 'kicl-font-size-extreme')}
      >
        {TOPICS.map(({ to }) => {
          return <Icon key={to} to={to} />;
        })}
      </span>
    </Layout>
  );
};

export { Icons };
