import React from 'react';

// Libraries
import classNames from 'classnames';

// Views
import { Footer } from '@/views/footer';
import { Menu } from '@/views/menu';

// Partials
import { Anchor } from './article/anchor';
import { Css } from './article/css';
import { Draft } from './article/draft';
import { Fallback } from './article/fallback';
import { Lighting } from './article/lighting';
import { Limits } from './article/limits';
import { Model } from './article/model';
import { Orbit } from './article/orbit';
import { Portal } from './article/portal';
import { References } from './article/references';
import { Room } from './article/room';
import { Trying } from './article/trying';
import { Why } from './article/why';
import { Provider } from './context';
import { Intro } from './intro';
import { Stage } from './stage';

// Constants
import { CLASS_NAME, TITLE_ID } from './constants';

// Styles
import './styles.scss';

const Contents: React.FunctionComponent = () => {
  return (
    <Provider>
      <Stage />
      <article
        aria-labelledby={TITLE_ID}
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-padding-inline-frame-columns-12',
          'kicl-position-relative'
        )}
      >
        <Intro />
        <Why />
        <Model />
        <Portal />
        <Anchor />
        <Lighting />
        <Orbit />
        <Room />
        <Css />
        <Fallback />
        <Trying />
        <Draft />
        <Limits />
        <References />
      </article>
      <Footer>
        <Menu />
      </Footer>
    </Provider>
  );
};

export { Contents };
