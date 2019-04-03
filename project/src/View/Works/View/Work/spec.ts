import {RouteComponentProps} from "react-router";

interface IMatchParams {
  projectId: string;
}

export interface IProps extends RouteComponentProps<IMatchParams> {
}
