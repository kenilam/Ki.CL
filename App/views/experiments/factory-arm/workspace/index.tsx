import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Button, Frame } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

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
import { CLASS_NAME, PANEL } from '@/views/experiments/factory-arm/constants';

/**
 * The stage, and the setup panel over its right side. Only the stage and
 * its cell are built again from the applied setup each time the operator
 * proceeds; the panel stays as it is. On small screens the panel folds away
 * behind the settings button.
 */
const Workspace: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { applied, run } = useSetup();

  return (
    <>
      <FactoryArmProvider key={run} setup={applied}>
        <Frame>
          {/* The frame's own element; R3F's canvas sizes itself inline to fill it, which the frame's classes can't override. */}
          <div
            aria-label={t('scene')}
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
        aria-label={t('action', { context: 'open_setup' })}
        popoverTarget={PANEL}
        variant='secondary'
      >
        <Ri.RiSettings3Line aria-hidden />
      </Button>

      <Panel />
    </>
  );
};

export { Workspace };
