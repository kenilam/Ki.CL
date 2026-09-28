import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { HyperLink, Navigation } from '@/components';

const COPY = {
  label: 'Contact',
};

const Aside: React.FunctionComponent = () => {
  return (
    <Navigation
      aria-label={COPY.label}
      alignContent='center'
      alignItems='center'
      autoFlow='column'
      className={classNames(
        'kicl-font-size-medium',
        'kicl-padding-block-start-wide',
        'kicl-z-index-raised'
      )}
      justifyContent='center'
      justifyItems='center'
    >
      <HyperLink
        aria-label='LinkedIn profile'
        lookLikeButton
        size='small'
        title='LinkedIn profile'
        to='https://www.linkedin.com/in/kenilam'
        variant='ghost'
      >
        <Icons.Ri.RiLinkedinLine aria-hidden />
      </HyperLink>
      <HyperLink
        aria-label='GitHub profile'
        lookLikeButton
        size='small'
        title='GitHub profile'
        to='https://github.com/kenilam'
        variant='ghost'
      >
        <Icons.Ri.RiGithubLine aria-hidden />
      </HyperLink>
      <HyperLink
        aria-label='Email me'
        lookLikeButton
        size='small'
        title='Email me'
        to='mailto:hello@ki-cl.com'
        variant='ghost'
      >
        <Icons.Ri.RiMailLine aria-hidden />
      </HyperLink>
    </Navigation>
  );
};

export { Aside };
