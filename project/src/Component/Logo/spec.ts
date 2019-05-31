import {ElementType} from 'react';

declare module ILogo {
  interface ClassNames extends IClassNames {
    default: string;
    square: string;
  }
  
  interface Component {
    component?: ElementType;
  }
  
  interface Props extends Component {
  }
}

export = ILogo;
