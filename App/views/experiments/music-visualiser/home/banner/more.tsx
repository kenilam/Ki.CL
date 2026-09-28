import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { HyperLink } from '@/components';

// Constants
import {
  ARTICLE_ID,
  COPY,
} from '@/views/experiments/music-visualiser/home/constants';

/**
 * A chevron at the foot of the banner, down to the article. In the flow, so
 * it never covers the words when the banner is full.
 */
const More: React.FunctionComponent = () => (
  <HyperLink
    aria-label={COPY.article}
    className={classNames(
      'kicl-margin-block-start-wider',
      'kicl-position-relative'
    )}
    lookLikeButton
    size='large'
    title={COPY.article}
    to={`#${ARTICLE_ID}`}
    variant='secondary'
  >
    <Ri.RiArrowDownSLine aria-hidden />
  </HyperLink>
);

export { More };
