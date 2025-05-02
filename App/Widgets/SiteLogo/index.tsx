import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout } from '@/Components';

// Icons
import { Logo } from '@/Icons';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--widgets--site-logo';
const TITLE = 'Ki.CL';

const SiteLogo: React.FunctionComponent<Spec.Props> = ({ ...props }) => {
  const className = classNames(CLASS_NAME, props.className);

  return (
    <Heading {...props} className={className} title={TITLE}>
      <Layout
        autoFlow='column'
        gap='narrower'
        alignItems='center'
        justifyContent='center'
      >
        <HyperLink className={`${CLASS_NAME}--hyper-link`} to='/' unstyled>
          <Logo />
        </HyperLink>
      </Layout>
    </Heading>
  );
};

type SiteLogoProps = Spec.Props;

export { type SiteLogoProps };
export default SiteLogo;
