import * as IComponentWebGL from '@/Component/WebGL/spec';
import {RouteComponentProps} from 'react-router';
import * as ITween from './Tween/spec';

declare module IWebGL {
  type Handler = ITween.Handler;
  
  interface ClassNames extends IClassNames {
    delay: string;
    default: string;
    duration: string;
  }
  
  interface Props extends RouteComponentProps {
    onComplete: Handler
  }
  
  type Render = IComponentWebGL.RenderState;
}

export = IWebGL;
