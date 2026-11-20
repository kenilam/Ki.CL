import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Back } from '@/views/experiments/swatch/back';
import { Provider as FilmProvider } from '@/views/experiments/swatch/film/context';
import { Maker } from '@/views/experiments/swatch/maker';
import { Open } from '@/views/experiments/swatch/open';
import { Article } from './article';
import { Backdrop } from './backdrop';
import { Chip } from './chip';
import { More } from './more';

// Styles
import './styles.scss';

// Hooks
import { useRouteTheme } from '@/views/experiments/swatch/use-route-theme';
import { useSwatch } from './use-swatch';

// Constants
import { CLASS_NAME, DRIFT, FADE } from './constants';

const Contents: React.FunctionComponent = () => {
  useSwatch();
  const theme = useRouteTheme();

  return (
    <FilmProvider>
      <Frame grow>
        <Layout
          alignItems='center'
          autoFlow='column'
          display='flex'
          gap='normal'
        >
          <article
            className={classNames(
              CLASS_NAME,
              theme,
              'kicl-padding-block-frame',
              'kicl-padding-inline-frame-columns-12',
              'kicl-position-relative'
            )}
          >
            <Backdrop />
            <Back />
            <Open
              className={classNames(
                DRIFT,
                FADE,
                'kicl-margin-block-start-auto',
                'kicl-position-relative'
              )}
            />
            <Chip />
            <More />
          </article>
        </Layout>
      </Frame>
      <Article />
      <Maker />
    </FilmProvider>
  );
};

export { Contents };
