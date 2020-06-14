declare namespace Spec {
  type Type =
    | "Fade"
    | "SlideDown"
    | "SlideFromLeft"
    | "SlideFromRight"
    | "SlideUp"
    | "ZoomIn"
    | "ZoomOut";

  type Types = {
    [type in Type]?: string;
  };

  type ClassNames = {
    [type in Type]?: string;
  };
}

export default Spec;
