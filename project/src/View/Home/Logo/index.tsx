import {CSSTransition, Logo as Origin} from '@/Component';
import ILogo from '@/View/Home/Logo/spec';
import React from 'react';
import './Style';

const Logo: React.FunctionComponent<ILogo.Props> = ({render}) => (
  <CSSTransition type='slideFromLeft' in={render}>
    <Origin isSquare={true} />
  </CSSTransition>
);

export default Logo;
