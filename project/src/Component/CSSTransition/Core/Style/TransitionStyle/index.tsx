import ITransitionStyle from './spec';
import './style.scss';
import value from './value.scss';

const Name: Partial<ITransitionStyle.Name> = {};

Object.keys(value as ITransitionStyle.Style).forEach(
  (name: ITransitionStyle.Key) => {
    Name[name] = name;
  }
);

export {Name};
export default value as ITransitionStyle.Style;
