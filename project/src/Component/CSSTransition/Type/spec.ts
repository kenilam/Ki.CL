export type Type =
  | 'Fade'
  | 'SlideDown'
  | 'SlideFromLeft'
  | 'SlideFromRight'
  | 'SlideUp'
  | 'ZoomIn'
  | 'ZoomOut';

export type Types = {
  [type in Type]?: Type;
};

export type ClassNames = {
  [type in Type]?: string;
};
