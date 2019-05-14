import * as INavigation from "@Component/Navigation/spec";
import {RouteComponentProps} from 'react-router';

declare module IHome {
  interface Component extends RouteComponentProps {
  }
  
  type clickHandler = INavigation.clickHandler;
  
  interface Props extends Component {
  }
}

export = IHome;
