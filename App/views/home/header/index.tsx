import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from 'design/components';

// Views
import { Language } from '@/views/language';

// Partials
import { Aside } from './aside';
import { Contents } from './contents';
import { Menu } from './menu';

// Constants
import { CONTENT_DELAY } from '@/views/constants';
import { ID } from './constants';

const CLASS_NAME = 'kicl--views--home--header';

const Header: React.FunctionComponent = () => {
  return (
    <Animation delay={CONTENT_DELAY} property='zoom-out'>
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
            'kicl-overflow-hidden',
            'kicl-padding-inline-extreme',
            'kicl-position-relative',
            'kicl-text-align-center',
            'kicl-text-wrap-balance',
            CLASS_NAME
          )}
          id={ID}
        >
          <Contents />
          <Menu />
          <Aside />
          <Language
            className={classNames(
              'kicl-margin-block-start-wide',
              'kicl-max-inline-size-columns-2',
              'kicl-z-index-raised'
            )}
            inline={false}
            placement='block-end-center'
          />
        </header>
      </Layout>
    </Animation>
  );
};

export { ID, Header };
