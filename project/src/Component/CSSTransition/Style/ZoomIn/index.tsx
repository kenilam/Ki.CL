import Selector from '@/Component/CSSTransition/Style/Selector';
import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import IZoomIn from './spec';
import Style from './Style';

const ZoomIn: FunctionComponent<IZoomIn.Props> = ({
  children,
  classNames,
  ...props
}) => (
  <Selector
    {...props}
    classNames={classnames(classNames, Style.default)}
  >
    {children}
  </Selector>
);

export default ZoomIn;
