import React from 'react';

// Icons
import * as Icons from '@/Icons';

// Components
import { HyperLink, Layout, Navigation } from '@/Components';

const CLASS_NAME = 'kicl--views--home--header--aside';

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
      <aside className={CLASS_NAME}>
        <Navigation
          alignContent='center'
          alignItems='center'
          animation={{
            delay: 800,
            property: 'slide-from-bottom',
          }}
          autoFlow='column'
          className='kicl-font-size-medium'
          justifyContent='center'
          justifyItems='center'
        >
          <HyperLink
            lookLikeButton
            size='small'
            title='link to my LinkedIn profile'
            to='https://www.linkedin.com/in/kenilam'
            variant='ghost'
          >
            <Icons.Ri.RiLinkedinLine />
          </HyperLink>
          <HyperLink
            lookLikeButton
            size='small'
            title='link to my Github profile'
            to='https://github.com/kenilam'
            variant='ghost'
          >
            <Icons.Ri.RiGithubLine />
          </HyperLink>
          <HyperLink
            lookLikeButton
            size='small'
            title='Send me a email'
            to='mailto:hello@ki-cl.com'
            variant='ghost'
          >
            <Icons.Ri.RiMailLine />
          </HyperLink>
        </Navigation>
      </aside>
    </Layout>
  );
};

export default Aside;
