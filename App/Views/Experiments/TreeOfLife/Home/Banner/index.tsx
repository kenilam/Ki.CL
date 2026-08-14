import React from 'react';

// Library
import classNames from 'classnames';

// Hook
import { useResponsive } from '@/Hooks';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Partials
import Attempts from './Attempts';

// Styles
import './Styles.scss';

// Constants
import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';
import { VERSION } from '@/Views/Experiments/TreeOfLife/Versions/v15/constants';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__banner';

const Banner: React.FunctionComponent = () => {
  const { isTablet } = useResponsive();

  return (
    <Layout
      alignItems={isTablet ? 'start' : 'center'}
      alignContent={isTablet ? 'start' : 'center'}
      autoFlow={isTablet ? 'row' : 'column'}
      gap='wider'
      justifyItems='start'
      justifyContent='start'
    >
      <header className={CLASS_NAME}>
        <div className={classNames('kicl-position-relative')}>
          <Heading
            is='h1'
            dense
            className={classNames(
              `${CLASS_NAME}__title`,
              'kicl-font-size-huge'
            )}
          >
            Tree of Life
          </Heading>
          <Text is='p' className={classNames('kicl-font-size-medium')}>
            Start at the origin of life and walk to any species alive now. There
            are about 2.3 million to choose from, and every organism you pass
            has an illustration drawn for it.
          </Text>
          <HyperLink
            className={classNames('kicl-background-color-confirm')}
            lookLikeButton
            to={toVersionPath({ version: VERSION })}
          >
            See the experience
          </HyperLink>
        </div>
        <Attempts />
      </header>
    </Layout>
  );
};

export default Banner;
