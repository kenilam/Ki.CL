import {RouteComponentProps} from 'react-router';

declare module IHome {
  export interface Component extends RouteComponentProps {
  }
  
  export interface Props extends Component {
  }
}

export = IHome;
