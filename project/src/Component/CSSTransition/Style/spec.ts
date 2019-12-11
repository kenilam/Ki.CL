import ISelector from '@/Component/CSSTransition/Style/Selector/spec';
import React from 'react';

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
  
  type Component =
    'Custom' |
    'Fade' |
    'SlideDown' |
    'SlideFromLeft' |
    'SlideFromRight' |
    'SlideUp' |
    'ZoomIn' |
    'ZoomOut';
  
  type Types = {
    [name in Component]: React.FunctionComponent<ISelector.Props>
  }
}

export default IStyle;