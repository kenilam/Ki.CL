import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { MoreLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ARTICLE_ID } from '@/views/experiments/swatch/card/constants';

const More: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <MoreLink
      className={classNames(
        'kicl-margin-block-start-auto',
        'kicl-position-relative'
      )}
      label={t('title', { context: 'how_it_was_made' })}
      to={`#${ARTICLE_ID}`}
    />
  );
};

export { More };
