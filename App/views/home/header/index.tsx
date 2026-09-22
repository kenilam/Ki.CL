import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from '@/components';

// Partials
import { Aside } from './aside';
import { Contents } from './contents';

// Constants
import { ID } from './constants';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--views--home--header';

const Header: React.FunctionComponent = () => {
  return (
    <Animation delay={300} property='zoom-out'>
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='row'
        gap='none'
        justifyContent='center'
        justifyItems='center'
      >
        <header
          className={classNames(
            'kicl-inline-size-full',
            'kicl-padding-inline-extreme',
            'kicl-position-relative',
            'kicl-text-align-center',
            CLASS_NAME
          )}
          id={ID}
        >
          <Contents />
          <Aside />
        </header>
      </Layout>
    </Animation>
  );
};

export { ID, Header };
