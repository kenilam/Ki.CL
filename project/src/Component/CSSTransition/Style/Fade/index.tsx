import Selector from '@/Component/CSSTransition/Style/Selector';
import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import IFade from './spec';
import Style from './Style';

const Fade: FunctionComponent<IFade.Props> = ({
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

export default Fade;
