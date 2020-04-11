import ICSSTransition from '@/Component/CSSTransition/spec';

declare namespace ISpinner {
  type ClassNames = IClassNames<'default' | 'withoverlay'>;

  interface Props extends ICSSTransition.Props {
    withOverlay?: boolean;
  }
}

export default ISpinner;
