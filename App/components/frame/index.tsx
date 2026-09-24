import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { Props } from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--components--frame';

/**
 * Frames one full-screen element: the window less a gap on every side, with
 * rounded corners that clip what bleeds past them. The top follows the global
 * header as it shows and hides.
 */
const Frame: React.FunctionComponent<Props> = ({
  animate = true,
  children,
  className,
  clip = true,
  delay = 0,
  grow,
  hold,
  ...rest
}) =>
  React.cloneElement(children, {
    ...rest,
    className: classNames(
      CLASS_NAME,
      {
        [`${CLASS_NAME}--grow`]: grow,
        [`${CLASS_NAME}--unclipped`]: !clip,
        [`${CLASS_NAME}--hold`]: hold,
        [`${CLASS_NAME}--in`]: animate,
      },
      className,
      children.props.className
    ),
    style: {
      [`--${CLASS_NAME}--delay`]: `${delay}ms`,
      ...children.props.style,
    } as React.CSSProperties,
  });

Frame.displayName = 'Frame';

export { Frame, type Props as FrameProps };
