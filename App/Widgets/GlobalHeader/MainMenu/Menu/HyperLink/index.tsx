import React, { type PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Animation
import Animation, { type AnimationProps, ANIMATION_STYLES } from '@/Animation';

// Helpers
import { CSSUnit } from '@/Helper';

// Contexts
import { useMenuContext } from '@/Widgets/GlobalHeader/MainMenu/Menu/Context';

// Components
import { HyperLink as Origin } from '@/Components';

// Spec
import * as Spec from './spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--main-menu--menu--hyper-link';

const DEBOUNCE = CSSUnit({
  values: window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--kicl-duration-fastest'),
});

const HyperLink: React.FunctionComponent<
  Required<PropsWithChildren> & Spec.Props
> = ({ index, children, ...props }) => {
  const { incrementIndex, ...MenuContext } = useMenuContext();

  const match = MenuContext.index >= index;

  const className = classNames(CLASS_NAME, {
    'is-hidden': !match,
  });

  const onEntering: AnimationProps['onEntering'] = () => {
    window.setTimeout(incrementIndex, DEBOUNCE);
  };

  return (
    <Animation
      animationStyle={ANIMATION_STYLES['slide-from-top']}
      in={match}
      onEntering={onEntering}
    >
      <Origin {...props} className={className}>
        {children}
      </Origin>
    </Animation>
  );
};

export default HyperLink;
