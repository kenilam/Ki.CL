import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { HyperLink } from 'design/components';

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
        'kicl-z-index-top'
      )}
      lookLikeButton
      size='small'
      to={`#${MAIN_ID}`}
    >
      {t('action', { context: 'skip_to_content' })}
    </HyperLink>
  );
};

export { SkipLink };
