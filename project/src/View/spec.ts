import ICSSTransition from '@/Component/CSSTransition/spec';
import { path as aboutPath } from './About';
import { path as contactPath } from './Contact';
import { path as homePath } from './Home';
import { path as workPath } from './Works';

const paths = [aboutPath, contactPath, homePath, workPath];

declare namespace IView {
  type ClassNames = IClassNames<'default'>;

  type View = 'about' | 'works' | 'home';

  type AwaitFor = {
    [name: string]: string;
  };

  type TransitionTypePaths = typeof paths[number];

  type TransitionType = {
    [path in TransitionTypePaths]: ICSSTransition.Type;
  };

  type Paths = {
    [name in View]?: string;
  };

  interface Props {}
}

export default IView;
