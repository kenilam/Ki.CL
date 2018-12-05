// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import CSSTransition from './CSSTransition';

import './style.scss';

type className = string;

type elementProps = {};

type components = {
  className: Array<className> | className,
  element: string,
  wrapper: string,
  elementProps: elementProps
};

type Props = {
  className: Array<className> | className,
  childComponent: React.Node,
  components: components
};

const defaultClassName = 'transition';

const Transition = ({
  className,
  childComponent,
  components,
  ...rest
}: Props) => {
  const { element, elementProps, wrapper, wrapperProps } = components;

  return (
    <TransitionGroup { ...{
      ...wrapperProps,
      className: classnames(defaultClassName, className),
      component: wrapper
    } }>
      {CSSTransition({
        ...rest,
        ...elementProps,
        component: element,
        className: components.className
      })}
    </TransitionGroup>
  );
};

export { CSSTransition };
export default Transition;
