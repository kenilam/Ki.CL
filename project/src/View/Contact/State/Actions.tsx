import IContact from '@/View/Contact/spec';
import { SyntheticEvent, useReducer } from 'react';

const types: IContact.Actions.Types = {
  CHANGE: 'CHANGE',
  ERROR: 'ERROR',
  RESET: 'RESET',
  SUBMIT: 'SUBMIT',
  SUCCESS: 'SUCCESS',
};

const initialData: IContact.Actions.Data = {
  email: null,
  error: null,
  id: null,
  message: null,
  name: null,
  shouldSubmit: false,
  success: false,
};

const getFormData = (
  event: SyntheticEvent<HTMLFormElement>
): IContact.Actions.Data => {
  const data = new FormData(event.currentTarget);

  const email = data.get('email') || null;
  const id = data.get('id') || null;
  const message = data.get('message') || null;
  const name = data.get('name') || null;
  const shouldSubmit = Boolean(email) && Boolean(message) && Boolean(name);
  const success = false;

  return { email, id, message, name, shouldSubmit, success };
};

const Actions = (): IContact.Actions.Props => {
  const reducer: IContact.Actions.Reducer = (form, actions) => {
    const { type, data } = actions;

    switch (type) {
      case types.CHANGE:
        return {
          ...data,
          error: false,
          shouldSubmit: false,
          success: false,
        };
      case types.ERROR:
        return {
          ...data,
          error: true,
          shouldSubmit: false,
          success: false,
        };
      case types.RESET:
        return initialData;
      case types.SUBMIT:
        return {
          ...form,
          error: false,
          shouldSubmit: true,
          success: false,
        };
      case types.SUCCESS:
        return {
          ...form,
          error: false,
          shouldSubmit: false,
          success: true,
        };
      default:
        return form;
    }
  };

  const [data, dispatch] = useReducer(reducer, initialData, undefined);

  const onChange: IContact.Actions.OnChange = (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    dispatch({ type: types.CHANGE, data: getFormData(event) });
  };

  const onError: IContact.Actions.OnSuccess = () => {
    dispatch({ type: types.SUCCESS });
  };

  const onReset: IContact.Actions.OnReset = () => {
    dispatch({ type: types.RESET });
  };

  const onSubmit: IContact.Actions.OnSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: types.SUBMIT, data: getFormData(event) });
  };

  const onSuccess: IContact.Actions.OnSuccess = () => {
    dispatch({ type: types.SUCCESS });
  };

  return {
    data,
    onChange,
    onError,
    onReset,
    onSuccess,
    onSubmit,
  };
};

export default Actions;
