import * as IRoundedRect from '@/View/Home/WebGL/Common/Rect/spec';
import {RouteComponentProps} from 'react-router';

declare module IVisualiser {
  interface Style extends IClassNames {
    fill: string;
  }
  
  interface Props extends RouteComponentProps {
  }
  
  interface UpdateProps extends IRoundedRect.UpdateProps {
  }
}

export = IVisualiser;
