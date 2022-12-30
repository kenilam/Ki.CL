import React from 'react';

// Components
import { Heading, HyperLink, Span } from '@/Components';

// Icons
import { Logo } from '@/Icons';

// Spec
import * as Spec from './spec';

// Styles
import './Styles.scss';

const SiteLogo: React.FunctionComponent<Spec.Props> = (props) => {
  return (
    <Heading className='kicl--widgets--site-logo' title='Ki.CL'>
      <HyperLink {...props} to='/'>
        <Logo />
        <Span>Ki.CL</Span>
      </HyperLink>
    </Heading>
  );
};

export default SiteLogo;
