import * as IWebGL from '@Component/WebGL/spec';
import * as ITween from '@View/Home/Graphic/Tween/spec';
import {RouteComponentProps} from 'react-router';

declare module IGraphic {
  type Handler = ITween.Handler;
  
  interface ClassNames extends IClassNames {
    delay: string;
    default: string;
    duration: string;
  }
  
  interface Props extends RouteComponentProps {
    onComplete: Handler
  }
  
  type Render = IWebGL.RenderState;
}

export = IGraphic;
