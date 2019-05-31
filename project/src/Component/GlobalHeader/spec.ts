import {RouteComponentProps} from 'react-router';

declare module IGlobalHeader {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Component extends RouteComponentProps, Props {
  
  }
  
  interface Props {
    transitionInPaths: string[];
  }
}
export = IGlobalHeader;
