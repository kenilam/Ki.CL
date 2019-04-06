import Logo from "@Component/Logo";
import {IProps} from "./spec";
import * as React from "react";
import Style from './Style';

const GlobalHeader: React.FunctionComponent<IProps> = () => (
  <header role='banner' className={Style.globalHeader}>
    <Logo/>
  </header>
);

export default GlobalHeader;
