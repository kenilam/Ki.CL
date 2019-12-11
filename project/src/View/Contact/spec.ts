import ICSSTransition from '@/Component/CSSTransition/spec';
import IHelper from "@/Helper/spec";

declare module IContact {
  interface Props extends ICSSTransition.Events {
  }
  
  type CancelFetch = IHelper.Cancel;
  
  type Params = {
    [name: string]: FormDataEntryValue
  }
}

export default IContact;
