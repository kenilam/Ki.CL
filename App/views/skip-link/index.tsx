import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { HyperLink } from '@/components';

// Constants
import { MAIN_ID } from '@/views/constants';

const CLASS_NAME = 'kicl--views--skip-link';

const COPY = {
  skip: 'Skip to content',
};

const SkipLink: React.FunctionComponent = () => (
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
    {COPY.skip}
  </HyperLink>
);

export { SkipLink };
