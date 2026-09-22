import React from 'react';

// Library
import classNames from 'classnames';

// Hook
import { useResponsive } from '@/hooks';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Partials
import { Attempts } from './attempts';

// Styles
import './styles.scss';

// Constants
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { VERSION } from '@/views/experiments/tree-of-life/versions/v15/constants';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__banner';

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
            size='small'
          >
            See the experience
          </HyperLink>
        </div>
        <Attempts />
      </header>
    </Layout>
  );
};

export { Banner };
