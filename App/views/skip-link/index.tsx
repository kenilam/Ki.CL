import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { MAIN_ID } from '@/views/constants';

const CLASS_NAME = 'kicl--views--skip-link';

const SkipLink: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <HyperLink
      className={classNames(
        CLASS_NAME,
        'kicl-hidden-focusable',
        'kicl-position-fixed',
        'kicl-inset-block-start-narrow',
        'kicl-inset-inline-start-narrow',
        'kicl-z-index-ceiling'
      )}
      lookLikeButton
      size='small'
      to={`#${MAIN_ID}`}
      variant='tertiary'
    >
      {t('action', { context: 'skip_to_content' })}
    </HyperLink>
  );
};

export { SkipLink };
