import IApi from "@/API/spec";
import ICSSTransition from '@/Component/CSSTransition/spec';
import {SyntheticEvent} from "react";

declare module IContact {
  interface Props extends ICSSTransition.Events {
  }
  
  type RenderField = IApi.Contact.Field | 'cta' | 'description' | 'title';
  
  module Actions {
    type Data = IApi.Contact.Params & {
      shouldSubmit?: boolean
    }
    
    type Type = 'CHANGE' | 'SUBMIT' | 'RESET';
    
    type Actions = {
      type: Type,
      data?: Data
    }
    
    type Reducer = (state: Data, actions: Actions) => void;
    
    type OnChange = (event: SyntheticEvent<HTMLFormElement>) => void;
    type OnReset = (event: SyntheticEvent<HTMLFormElement>) => void;
    type OnSubmit = (event: SyntheticEvent<HTMLFormElement>) => void;
    
    interface Props {
      data: IApi.Contact.Params & { shouldSubmit: boolean },
      onChange: OnChange,
      onReset: OnReset,
      onSubmit: OnSubmit
    }
  }
}

export default IContact;
