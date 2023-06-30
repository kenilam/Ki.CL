import React, { type PropsWithRef } from 'react';

// Components
import { Heading, HyperLink, Span } from '@/Components';

// Icons
import { Logo } from '@/Icons';

// Spec
import * as Spec from './spec';

// Styles
import './Styles.scss';

const SiteLogo: React.FunctionComponent<PropsWithRef<Spec.Props>> = (props) => {
  return (
    <Heading
      {...props}
      className='kicl--widgets--site-logo'
      title='Ki.CL | HOME'
    >
      <HyperLink className='kicl--widgets--site-logo--hyper-link' to='/'>
        <Logo />
        <Span className='kicl--widgets--site-logo--span'>Ki.CL</Span>
      </HyperLink>
    </Heading>
  );
};

export default SiteLogo;
