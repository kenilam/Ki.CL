import ICSSTransition from '@/Component/CSSTransition/spec';
import './style.scss';
import style, {Name as name} from './TransitionStyle';
import value from './value.scss';

const TransitionStyle = {style, name};

export {TransitionStyle};
export default value as ICSSTransition.ClassNames;
