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
          autoFlow='column'
          className='kicl-font-size-medium'
          justifyContent='center'
          justifyItems='center'
        >
          <HyperLink
            lookLikeButton
            size='small'
            to='https://www.linkedin.com/in/kenilam'
            variant='ghost'
          >
            <Icons.Ri.RiLinkedinFill />
          </HyperLink>
          <HyperLink
            lookLikeButton
            size='small'
            to='https://github.com/kenilam'
            variant='ghost'
          >
            <Icons.Ri.RiGithubLine />
          </HyperLink>
          <HyperLink
            lookLikeButton
            size='small'
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
