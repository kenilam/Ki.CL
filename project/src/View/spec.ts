import ICSSTransition from '@/Component/CSSTransition/spec';

declare module IView {
  interface ClassName extends IClassNames {
    default: string;
  }
  
  type View = 'about' | 'works' | 'home';
  
  type AwaitFor = {
    [name: string]: string;
  }
  
  type TransitionType = {
    [path: string]: ICSSTransition.Type
  }
  
  type Paths = {
    [name in View]?: string;
  }
  
  interface Props {
  }
}

export default IView;
