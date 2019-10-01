declare module IStyle {
  type Type =
    'custom' |
    'fade' |
    'slideDown' |
    'slideFromLeft' |
    'slideFromRight' |
    'slideUp' |
    'zoomIn' |
    'zoomOut';
  
  interface Props {
    type?: Type;
  }
}

export default IStyle;
