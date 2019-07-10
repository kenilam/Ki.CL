import * as ICommon from '@/View/Home/WebGL/Common/spec';

declare module IBackFill {
  interface Style extends IClassNames {
    fill: string
  }
  
  interface UpdateProps {
    alpha?: ICommon.Alpha;
    height?: ICommon.Height;
    width?: ICommon.Width;
    x?: ICommon.X;
    y?: ICommon.Y;
  }
}

export = IBackFill;
