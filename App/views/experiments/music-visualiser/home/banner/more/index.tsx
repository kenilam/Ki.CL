import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { MoreLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ARTICLE_ID } from '@/views/experiments/music-visualiser/home/constants';

/**
 * A chevron at the foot of the banner, down to the article. In the flow, so
 * it never covers the words when the banner is full.
 */
const More: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <MoreLink
      className={classNames(
        'kicl-margin-block-start-wider',
        'kicl-position-relative'
      )}
      label={t('title', { context: 'how_it_was_made' })}
      to={`#${ARTICLE_ID}`}
    />
  );
};

export { More };
