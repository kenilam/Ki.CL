import {ElementType} from 'react';

declare module ILogo {
  interface ClassNames extends IClassNames {
  }
  
  interface Component {
    component?: ElementType;
  }
  
  interface Props extends Component {
    className?: string;
  }
}

export = ILogo;
