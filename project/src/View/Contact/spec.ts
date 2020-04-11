import IApi from '@/API/spec';
import { SyntheticEvent } from 'react';

declare namespace IContact {
  type RenderField = IApi.Contact.Field | 'cta' | 'description' | 'title';

  namespace Actions {
    type Data = IApi.Contact.Params &
      IApi.Contact.Status & {
        shouldSubmit?: boolean;
      };

    type Actions = {
      type: Type;
      data?: Data;
    };

    type Type = 'CHANGE' | 'ERROR' | 'SUBMIT' | 'SUCCESS' | 'RESET';

    type Types = {
      [name in Type]: Type;
    };

    type Reducer = (state: Data, actions: Actions) => void;

    type OnChange = (event: SyntheticEvent<HTMLFormElement>) => void;
    type OnError = () => void;
    type OnReset = () => void;
    type OnSubmit = (event: SyntheticEvent<HTMLFormElement>) => void;
    type OnSuccess = () => void;

    interface Props {
      data?: Data;
      onChange: OnChange;
      onError: OnError;
      onReset: OnReset;
      onSuccess: OnSuccess;
      onSubmit: OnSubmit;
    }
  }

  interface Props {}
}

export default IContact;
