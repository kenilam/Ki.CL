import React from 'react';

// Libraries
import classNames from 'classnames';

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/constants';

// Styles
import './styles.scss';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSeat } from './use-seat';

// Partials
import { Pills } from './pills';

/**
 * Names live in screen space, so they don't shrink with the camera and can be
 * placed against each other. React owns which labels exist; the frame loop
 * seats them by writing `transform` straight onto the links.
 */
const Labels: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const hostRef = useSeat();

  return (
    <nav
      aria-label={t('label', { context: 'taxa' })}
      ref={hostRef}
      className={classNames(
        `${CLASS_NAME}__labels`,
        'kicl-z-index-raised',
        'kicl-inset-0',
        // Off-frame pills are still transformed, and would stretch the page.
        'kicl-overflow-hidden',
        'kicl-position-absolute',
        'kicl-pointer-events-none'
      )}
    >
      <Pills />
    </nav>
  );
};

export { Labels };
