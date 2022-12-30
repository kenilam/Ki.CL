import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Animation
import Animation, { ANIMATION_STYLES } from '@/Animation';

// Components
import { HyperLink as Origin } from '@/Components';

// Spec
import * as Spec from './spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--main-menu--menu--hyper-link';

const HyperLink: React.FunctionComponent<
  Required<PropsWithChildren> & Spec.Props
> = ({ in: _in, to, children, ...props }) => {
  const className = classNames(CLASS_NAME, {
    'is-hidden': !_in,
  });

  return (
    <Animation
      {...props}
      animationStyle={ANIMATION_STYLES['slide-down']}
      in={_in}
      unmountOnExit={false}
    >
      <Origin className={className} to={to}>
        {children}
      </Origin>
    </Animation>
  );
};

export default HyperLink;
