import {RouteComponentProps} from 'react-router';

declare module IGlobalHeader {
  interface ClassNames extends IClassNames {
  }
  
  interface Component extends RouteComponentProps, Props {
  
  }
  
  interface Props {
    transitionInPaths: string[];
  }
}
export = IGlobalHeader;
