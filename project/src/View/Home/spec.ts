import { RouteComponentProps } from 'react-router';

declare module IHome {
  interface ClassNames extends IClassNames {
    gutter: string;
    tweenTime: string;
  }
  
  interface Props extends RouteComponentProps {
  }
  
  interface Component {
  }
}

export = IHome;
