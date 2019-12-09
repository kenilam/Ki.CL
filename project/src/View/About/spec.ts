import ICSSTransition from '@/Component/CSSTransition/spec';

declare module IAbout {
  interface Data {
    sections: {
      About: string
    }
  }
  
  interface Props extends ICSSTransition.Events {
  }
}

export default IAbout;
