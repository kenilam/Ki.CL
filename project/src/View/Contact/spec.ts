import ICSSTransition from '@/Component/CSSTransition/spec';
import IHelper from '@/Helper/spec';

declare module IContact {
  interface Props extends ICSSTransition.Events {
  }
  
  type CancelFetch = IHelper.Cancel;
  
  type Params = {
    [name: string]: FormDataEntryValue
  }
  
  type Render = boolean;
  
  type RenderIndex = number;
}

export default IContact;
