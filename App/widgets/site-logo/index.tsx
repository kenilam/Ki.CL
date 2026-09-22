import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { HyperLink, Layout, Text } from '@/components';

// Icons
import { Logo } from '@/icons';

// Spec
import * as Spec from './spec';

const CLASS_NAME = 'kicl--widgets--site-logo';
const COPY = {
  home: 'Ki.CL home',
};

const SiteLogo: React.FunctionComponent<Spec.Props> = ({
  className: _className,
}) => {
  const className = classNames(CLASS_NAME, _className);

  return (
    <Text className={className} dense lookLike='h1'>
      <Layout
        autoFlow='column'
        gap='narrower'
        alignItems='center'
        justifyContent='center'
      >
        <HyperLink
          aria-label={COPY.home}
          className='kicl-line-height-narrower'
          to='/'
          unstyled
        >
          <Logo />
        </HyperLink>
      </Layout>
    </Text>
  );
};

type SiteLogoProps = Spec.Props;

export { SiteLogo, type SiteLogoProps };
