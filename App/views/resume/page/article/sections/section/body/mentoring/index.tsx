import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Figures } from './figures';
import { Profile } from './profile';
import { Quotes } from './quotes';
import { Recognitions } from './recognitions';
import { Summary } from './summary';

const Mentoring: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide'>
      <div
        className={classNames(
          'kicl-max-inline-size-columns-8',
          'kicl-scroll-enter-near'
        )}
      >
        <Summary />
        <Figures />
        <Recognitions />
        <Quotes />
        <Profile />
      </div>
    </Layout>
  );
};

export { Mentoring };
