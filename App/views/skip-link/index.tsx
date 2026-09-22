import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { HyperLink } from '@/components';

// Styles
import './styles.scss';

// Constants
import { MAIN_ID } from '@/views/constants';

const CLASS_NAME = 'kicl--views--skip-link';

const COPY = {
  skip: 'Skip to content',
};

/** HyperLink handles the scroll for hash links, so focus is moved here. */
const onClick = () => {
  document.getElementById(MAIN_ID)?.focus({ preventScroll: true });
};

const SkipLink: React.FunctionComponent = () => (
  <HyperLink
    className={classNames(
      CLASS_NAME,
      'kicl-hidden-focusable',
      'kicl-position-fixed',
      'kicl-inset-block-start-narrow',
      'kicl-inset-inline-start-narrow'
    )}
    lookLikeButton
    onClick={onClick}
    size='small'
    to={`#${MAIN_ID}`}
  >
    {COPY.skip}
  </HyperLink>
);

export { SkipLink };
