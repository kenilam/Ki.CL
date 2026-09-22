import React from 'react';

// Library
import classNames from 'classnames';

// Hook
import { useResponsive } from '@/hooks';

// Components
import { Layout } from '@/components';

// Partials
import { Attempts } from './attempts';
import { Intro } from './intro';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

const Banner: React.FunctionComponent = () => {
  const { isTablet } = useResponsive();

  return (
    <Layout
      alignItems={isTablet ? 'start' : 'center'}
      alignContent={isTablet ? 'start' : 'center'}
      autoFlow={isTablet ? 'row' : 'column'}
      gap='extreme'
      justifyItems='start'
      justifyContent='start'
    >
      <header className={classNames(CLASS_NAME, 'kicl-position-relative')}>
        <Intro />
        <Attempts />
      </header>
    </Layout>
  );
};

export { CLASS_NAME, Banner };
