import Selector from '@/Component/CSSTransition/Style/Selector';
import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import IZoomOut from './spec';
import Style from './Style';

const {default: className} = Style;

const ZoomOut: FunctionComponent<IZoomOut.Props> = ({
  children,
  classNames,
  ...props
}) => (
  <Selector
    {...props}
    classNames={classnames(classNames, className)}
  >
    {children}
  </Selector>
);

export {className};
export default ZoomOut;
