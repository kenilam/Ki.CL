import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button, HyperLink, Navigation } from 'design/components';

// Views
import { CONTACT_ID, COPY as CONTACT } from '@/views/contact/constants';

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
        <Ri.RiLinkedinLine aria-hidden />
      </HyperLink>
      <HyperLink
        aria-label='GitHub profile'
        lookLikeButton
        size='small'
        title='GitHub profile'
        to='https://github.com/kenilam'
        variant='ghost'
      >
        <Ri.RiGithubLine aria-hidden />
      </HyperLink>
      <Button
        aria-label={CONTACT.title}
        command='show-modal'
        commandFor={CONTACT_ID}
        size='small'
        title={CONTACT.title}
        variant='ghost'
      >
        <Ri.RiMailLine aria-hidden />
      </Button>
    </Navigation>
  );
};

export { Aside };
