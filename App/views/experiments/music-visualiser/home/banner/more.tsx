import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { HyperLink } from 'design/components';

// Constants
import { ARTICLE_ID } from '@/views/experiments/music-visualiser/home/constants';

/**
 * A chevron at the foot of the banner, down to the article. In the flow, so
 * it never covers the words when the banner is full.
 */
const More: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
  const label = common('title', { context: 'how_it_was_made' });

  return (
    <HyperLink
      aria-label={label}
      className={classNames(
        'kicl-margin-block-start-wider',
        'kicl-position-relative'
      )}
      lookLikeButton
      size='large'
      title={label}
      to={`#${ARTICLE_ID}`}
      variant='secondary'
    >
      <Ri.RiArrowDownSLine aria-hidden />
    </HyperLink>
  );
};

export { More };
