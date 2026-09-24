import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { HyperLink, Layout } from '@/components';

// Constants
import { ARTICLE_ID } from '@/views/experiments/music-visualiser/home/constants';

const COPY = {
  more: 'How it was made',
};

/**
 * A chevron at the foot of the banner, down to the article. In the flow, so
 * it never covers the words when the banner is full.
 */
const More: React.FunctionComponent = () => (
  <Layout justifyItems='center'>
    <div
      className={classNames(
        'kicl-margin-block-start-wider',
        'kicl-position-relative'
      )}
    >
      <HyperLink
        aria-label={COPY.more}
        lookLikeButton
        size='large'
        title={COPY.more}
        to={`#${ARTICLE_ID}`}
        variant='secondary'
      >
        <Ri.RiArrowDownSLine aria-hidden />
      </HyperLink>
    </div>
  </Layout>
);

export { More };
