import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from '@/Components';

// Partials
import Aside from './Aside';
import Contents from './Contents';

// Constants
import { ID } from './Constants';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--home--header';

const Header: React.FunctionComponent = () => {
  return (
    <Animation animationDelay={1000} animationStyle='zoom-out'>
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='row'
        gap='none'
        justifyContent='center'
        justifyItems='center'
      >
        <header
          className={classNames('kicl-text-align-center', CLASS_NAME)}
          id={ID}
          role='banner'
        >
          <Contents />
          <Aside />
        </header>
      </Layout>
    </Animation>
  );
};

export { ID };
export default Header;
