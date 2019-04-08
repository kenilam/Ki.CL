import './custom.scss';
import './fade.scss';
import './slide-up.scss';
import {IProps} from './spec';
import value from './value.scss';

let TransitionStyleName: Partial<IProps> = {};

Object.keys(value).forEach(
  name => {
    TransitionStyleName[name as keyof IProps] = name;
  }
);

export {TransitionStyleName};
export default value as IProps;
