import ICSSTransition from '@/Component/CSSTransition/spec';
import IStyle from '@/Component/CSSTransition/Style/spec';
import React, {FunctionComponent} from 'react';
import TransitionStyle from './Style';

const CSSTransition: FunctionComponent<ICSSTransition.Props> = ({
  children,
  type,
  ...props
}) => {
  const Component = (
    TransitionStyle[`${
      type[0].toUpperCase()
    }${
      type.substr(1)
    }` as IStyle.Component]
  );
  
  return (
    <Component {...props}>
      {children}
    </Component>
  );
};

CSSTransition.defaultProps = {
  type: 'custom'
};

export {TransitionStyle};
export default CSSTransition;
