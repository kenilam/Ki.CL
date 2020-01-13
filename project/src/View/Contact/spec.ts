import ICSSTransition from '@/Component/CSSTransition/spec';
import IHelper from '@/Helper/spec';

declare module IContact {
  interface Props extends ICSSTransition.Events {
  }
  
  type CancelFetch = IHelper.Cancel;
  
  type IsValid = boolean;
  
  type Field = 'cta' | 'description' | 'email' | 'message' | 'name' | 'title';
  
  type Params = {
    [name in Field]?: FormDataEntryValue
  }
  
  type Render = boolean;
  
  type RenderIndex = number;
}

export default IContact;
