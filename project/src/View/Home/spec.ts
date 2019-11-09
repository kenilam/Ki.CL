import IRouter from '@/Component/Router/spec';

declare module IHome {
  interface ClassNames extends IClassNames {
    backgroundImage: string;
  }
  
  interface Props extends IRouter.ChildActions {
  }
  
  interface Component {
  }
}

export default IHome;
