import {RouteComponentProps} from 'react-router';

declare module IWork {
  interface MatchParams {
    projectId: string;
  }
  
  interface Props extends RouteComponentProps<MatchParams> {
  
  }
}

export default IWork;
