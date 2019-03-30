import * as React from 'react';
import { CSSTransition as CSSTransitionOrigin } from 'react-transition-group';

import { IProps } from './typings';

const CSSTransition: React.FunctionComponent<IProps> = ({
  children,
  transitionKey
}) => (
  <CSSTransitionOrigin
    classNames='css-transition'
    timeout={1000}
    key={transitionKey}
  >
    {children}
  </CSSTransitionOrigin>
);

export default CSSTransition;
