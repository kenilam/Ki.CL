import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { BackLink, Button, Frame } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { FactoryArmProvider } from '@/views/experiments/factory-arm/context';
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Partials
import { Alert } from './alert';
import { Notice } from './notice';
import { Remove } from './remove';
import { Panel } from './panel';
import { Scene } from './scene';

// Styles
import './styles.scss';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  CLASS_NAME,
  PANEL,
  PATH,
} from '@/views/experiments/factory-arm/constants';

/**
 * The stage, and the setup panel over its right side. Only the stage and
 * its cell are built again from the applied setup each time the operator
 * proceeds; the panel stays as it is. On small screens the panel folds away
 * behind the settings button.
 */
const Workspace: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    factoryArm: useTranslation('factory-arm'),
  };
  const { applied, run } = useSetup();

  return (
    <>
      <FactoryArmProvider key={run} setup={applied}>
        <Frame>
          {/* The frame's own element: the canvas sizes itself to fill it, and the overlays sit over the canvas in its coordinates. */}
          <figure
            className={classNames(
              CLASS_NAME,
              // Dragging turns the view and pinching zooms it, so the page must not.
              'kicl-overscroll-behavior-none',
              'kicl-position-relative',
              'kicl-touch-action-none',
              'kicl-user-select-none'
            )}
          >
            <Scene />
            <Notice />
            <Remove />
          </figure>
        </Frame>

        <Alert />
      </FactoryArmProvider>

      <BackLink
        className={classNames(
          'kicl-position-fixed',
          'kicl-inset-block-start',
          'kicl-inset-inline-start',
          'kicl-z-index-floating'
        )}
        label={translations.common.t('experiments')}
        to={toExperimentsPath(PATH)}
      />

      <Button
        className={classNames(
          `${CLASS_NAME}__open`,
          'kicl-position-fixed',
          'kicl-inset-block-start',
          'kicl-inset-inline-end',
          'kicl-z-index-floating'
        )}
        aria-label={translations.factoryArm.t('action', {
          context: 'open_setup',
        })}
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
