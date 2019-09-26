declare module ITransitionStyle {
  type Key = 'custom' | 'fade' | 'slideDown' | 'slideLeft' | 'slideRight' | 'slideUp' | 'zoomIn' | 'zoomOut';
  type Name = {
    [name in Key]: Key;
  }
  type Style = {
    [name in Key]: string;
  }
}

export default ITransitionStyle;
