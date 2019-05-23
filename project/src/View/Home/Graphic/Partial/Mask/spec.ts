import * as IRoundedRect from "@View/Home/Graphic/Partial/Common/Rect/spec";

declare module IMask {
  interface Style extends IClassNames {
    radius: string;
    bleed: string;
    fill: string;
  }
  
  interface UpdateProps extends IRoundedRect.UpdateProps {
  }
}

export = IMask;