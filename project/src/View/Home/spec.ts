import {IHomeContent} from '$resources/spec';
import {RouteComponentProps} from 'react-router';
import {IUpdateWindowSizes, IWindowSizes} from "./State/spec";

export interface IComponent {
}

export interface IProps extends RouteComponentProps, IWindowSizes, IUpdateWindowSizes, IHomeContent {

}
