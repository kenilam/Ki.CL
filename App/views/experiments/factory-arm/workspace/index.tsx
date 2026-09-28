import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Frame } from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { FactoryArmProvider } from '@/views/experiments/factory-arm/context';
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Partials
import { Alert } from '@/views/experiments/factory-arm/alert';
import { Panel } from '@/views/experiments/factory-arm/panel';
import { Scene } from '@/views/experiments/factory-arm/scene';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME,
  COPY,
  PANEL,
} from '@/views/experiments/factory-arm/constants';

/**
 * The stage, and the setup panel over its right side. Only the stage and
 * its cell are built again from the applied setup each time the operator
 * proceeds; the panel stays as it is. On small screens the panel folds away
 * behind the settings button.
 */
const Workspace: React.FunctionComponent = () => {
  const { applied, run } = useSetup();

  return (
    <>
      <FactoryArmProvider key={run} setup={applied}>
        <Frame>
          {/* The frame's own element; R3F's canvas sizes itself inline to fill it, which the frame's classes can't override. */}
          <div
            aria-label={COPY.scene}
            className={classNames(
              CLASS_NAME,
              // Dragging turns the view and pinching zooms it, so the page must not.
              'kicl-overscroll-behavior-none',
              'kicl-touch-action-none',
              'kicl-user-select-none'
            )}
            role='img'
          >
            <Scene />
          </div>
        </Frame>

        <Alert />
      </FactoryArmProvider>

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
    </>
  );
};

export { Workspace };
