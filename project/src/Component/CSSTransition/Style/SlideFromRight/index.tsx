import Selector from '@/Component/CSSTransition/Style/Selector';
import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import ISlideFromRight from './spec';
import Style from './Style';

const SlideFromRight: FunctionComponent<ISlideFromRight.Props> = ({
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

export default SlideFromRight;
