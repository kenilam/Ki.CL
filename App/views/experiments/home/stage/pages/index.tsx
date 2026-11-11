import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { PageIndicator } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SCREENS } from '@/views/experiments/home/stage/screens';

/**
 * One dot per panel. Under reduced motion the panels flow and their anchors
 * all sit at the top, so the dots would lead nowhere; they are hidden then.
 */
const Pages: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <PageIndicator
      aria-label={t('experiments')}
      className={classNames(
        'kicl-animation-none-reduced-motion',
        'kicl-visibility-hidden-reduced-motion'
      )}
      pages={SCREENS.map(({ experiment }) => {
        return {
          id: experiment.plate,
          label: t('experiment', { context: experiment.context }),
        };
      })}
    />
  );
};

export { Pages };
