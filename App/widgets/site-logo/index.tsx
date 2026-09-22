import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout } from '@/components';

// Icons
import { Logo } from '@/icons';

// Spec
import * as Spec from './spec';

const CLASS_NAME = 'kicl--widgets--site-logo';
const TITLE = 'Ki.CL';

const SiteLogo: React.FunctionComponent<Spec.Props> = ({ ...props }) => {
  const className = classNames(CLASS_NAME, props.className);

  return (
    <Heading {...props} className={className} dense title={TITLE}>
      <Layout
        autoFlow='column'
        gap='narrower'
        alignItems='center'
        justifyContent='center'
      >
        <HyperLink className='kicl-line-height-narrower' to='/' unstyled>
          <Logo />
        </HyperLink>
      </Layout>
    </Heading>
  );
};

type SiteLogoProps = Spec.Props;

export { SiteLogo, type SiteLogoProps };
