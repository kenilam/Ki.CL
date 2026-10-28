import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Animation, Badge } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Overlays
import { toElement } from '@/views/experiments/factory-arm/scene/overlays';

/**
 * The badge over what the arm can't do. It is the page's `Alert` that screen
 * readers hear; this one is for the eye, and lets clicks through to the scene.
 */
const Notice: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { skipped, stopped } = useFactoryArmContext();

  if (!skipped && !stopped) {
    return null;
  }

  const level = stopped ? 'error' : 'warning';

  return (
    <Animation property='slide-from-bottom'>
      <Badge
        aria-hidden
        className={classNames(
          'kicl-inset-block-start-0',
          'kicl-inset-inline-start-0',
          'kicl-pointer-events-none',
          'kicl-position-absolute',
          'kicl-text-nowrap'
        )}
        level={level}
        ref={toElement('notice')}
        size='small'
        style={{ visibility: 'hidden' }}
        variant='ghost'
      >
        {/* A status dot in the level's colour; the outline's text is the page's. */}
        <Ri.RiCheckboxBlankCircleFill
          aria-hidden
          className={`kicl-color-${level}`}
        />
        {stopped ? t('stopped', { context: 'message' }) : t('skipped')}
      </Badge>
    </Animation>
  );
};

export { Notice };
