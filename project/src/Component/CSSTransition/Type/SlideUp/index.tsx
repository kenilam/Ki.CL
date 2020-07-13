import CSSTransition from '@/Component/CSSTransition';
import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import Style from './Style';
import { Props, Type } from './spec';

const { default: className } = Style;

const type: Type = 'SlideUp';

const SlideUp: FunctionComponent<Props> = ({
  children,
  classNames,
  ...props
}) => (
  <CSSTransition {...props} classNames={classnames(classNames, className)}>
    {children}
  </CSSTransition>
);

export { className, type };
export default SlideUp;
