import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Frame } from '@/components';

// Icons
import { Ri } from '@/icons';

// Partials
import { HubProvider } from './hub';
import { Panel } from './panel';
import { Scene } from './scene';
import { DragProvider } from './scene/drag';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME, COPY, PANEL } from './constants';

/** The floor of arms, and the panel over its right side. On small screens the panel folds away behind a button. */
const Floor: React.FunctionComponent = () => (
  <HubProvider>
    <DragProvider>
      <Frame>
        {/* The frame's own element; R3F's canvas sizes itself inline to fill it. */}
        <div
          aria-label={COPY.scene}
          className={classNames(
            CLASS_NAME,
            'kicl-overscroll-behavior-none',
            'kicl-touch-action-none',
            'kicl-user-select-none'
          )}
          role='img'
        >
          <Scene />
        </div>
      </Frame>

      <Button
        className={classNames(
          `${CLASS_NAME}__open`,
          'kicl-position-fixed',
          'kicl-inset-block-start',
          'kicl-inset-inline-end',
          'kicl-z-index-floating'
        )}
        popoverTarget={PANEL}
        variant='secondary'
      >
        <Ri.RiSettings3Line aria-hidden />
        <span className='kicl-hidden'>{COPY.panel.open}</span>
      </Button>

      <Panel />
    </DragProvider>
  </HubProvider>
);

export { Floor };
