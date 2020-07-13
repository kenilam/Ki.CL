import * as Api from '@/API/Contact/spec';
import { SyntheticEvent } from 'react';

type Params = Api.Params;

export type Data = Params & {
  hasChange?: boolean;
  shouldRender?: boolean;
  shouldSubmit?: boolean;
};

export type OnChange = (event: SyntheticEvent<HTMLFormElement>) => void;
export type OnError = () => void;
export type OnRender = () => void;
export type OnReset = (event: SyntheticEvent<HTMLFormElement>) => void;
export type OnSubmit = (event: SyntheticEvent<HTMLFormElement>) => void;
export type OnSuccess = () => void;

export type Type = 'CHANGE' | 'RENDER' | 'ERROR' | 'SUBMIT' | 'SUCCESS' | 'RESET';

export type Actions = {
  type: Type;
  data?: Data;
};

export type Reducer = (state: Data, actions: Actions) => void;

export type Types = {
  [name in Type]: Type;
};

export type Props = {
  data?: Data;
  onChange: OnChange;
  onError: OnError;
  onRender: OnRender;
  onReset: OnReset;
  onSuccess: OnSuccess;
  onSubmit: OnSubmit;
};
