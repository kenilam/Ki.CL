import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { HyperLink, Layout, Navigation } from '@/components';

const CLASS_NAME = 'kicl--views--home--header--aside';

const COPY = {
  label: 'Contact',
};

const Aside: React.FunctionComponent = () => {
  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='row'
      gap='wide'
      justifyContent='center'
      justifyItems='center'
    >
      <div className={classNames('kicl-padding-block-start-wide', CLASS_NAME)}>
        <Navigation
          aria-label={COPY.label}
          alignContent='center'
          alignItems='center'
          autoFlow='column'
          className='kicl-font-size-medium'
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
      </div>
    </Layout>
  );
};

export { Aside };
