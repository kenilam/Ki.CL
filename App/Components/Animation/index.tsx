import React, { FunctionComponent } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';
import './Styles.blur.scss';
import './Styles.fade.scss';
import './Styles.slide-from-top.scss';
import './Styles.slide-from-left.scss';
import './Styles.slide-from-right.scss';
import './Styles.slide-from-bottom.scss';
import './Styles.zoom-in.scss';
import './Styles.zoom-out.scss';

const CLASS_NAME = 'kicl--components--animation';

const PROPERTIES: Spec.Properties = {
  blur: 'blur',
  fade: 'fade',
  'slide-from-bottom': 'slide-from-bottom',
  'slide-from-left': 'slide-from-left',
  'slide-from-right': 'slide-from-right',
  'slide-from-top': 'slide-from-top',
  'zoom-in': 'zoom-in',
  'zoom-out': 'zoom-out',
};

/**
 * Applies an entering and leaving transition to its only child.
 *
 * The choreography is entirely CSS. `@starting-style` supplies the value to
 * animate *from* when the element first renders or comes back from
 * `display: none`, and `transition-behavior: allow-discrete` keeps the element
 * displayed until the leaving transition has finished. Both are in
 * `Styles.scss`; nothing here schedules, measures, or times anything.
 *
 * What is left for this component is the part CSS cannot express: which style
 * to use, and the three values that vary per instance, which go on the element
 * as custom properties rather than into a stylesheet.
 */
const Animation: FunctionComponent<Spec.Props> = ({
  delay,
  duration = 'fast',
  easing = 'ease-sharp-in-out',
  property = PROPERTIES.fade,
  children,
  className,
  in: transitionIn = true,
  nodeRef,
  ...rest
}) => {
  const child = React.Children.only(children);

  if (!React.isValidElement(child)) {
    return child;
  }

  const props = child.props as {
    className?: string;
    ref?: React.Ref<HTMLElement | null>;
    style?: React.CSSProperties;
  };

  /*
   * The child may already own a ref, and `cloneElement` would drop it. Both
   * get the node.
   */
  const assign =
    (ref: React.Ref<HTMLElement | null> | undefined) =>
    (node: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
        return;
      }

      if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

  const setRef = (node: HTMLElement | null) => {
    assign(nodeRef)(node);
    assign(props.ref)(node);
  };

  return React.cloneElement(
    child as React.ReactElement<Record<string, unknown>>,
    {
      ...rest,
      className: classNames(
        CLASS_NAME,
        `${CLASS_NAME}--property--${property}`,
        props.className,
        className
      ),
      /*
       * An attribute rather than a class because it is state, not identity —
       * and it gives the stylesheet a `:not()` to hang the leaving values on
       * without inventing a second class name for the negative case.
       */
      'data-animation-in': transitionIn ? '' : undefined,
      ref: setRef,
      style: {
        ...(delay === undefined
          ? {}
          : { [`--${CLASS_NAME}--transition-delay`]: `${delay}ms` }),
        [`--${CLASS_NAME}--transition-duration`]: `var(--kicl-transition-duration-${duration})`,
        [`--${CLASS_NAME}--transition-timing-function`]: `var(--kicl-${easing})`,
        ...props.style,
      } as React.CSSProperties,
    }
  );
};

type AnimationProps = Spec.Props;

export { type AnimationProps, PROPERTIES };
export default Animation;
