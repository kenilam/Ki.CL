import { useReducer, SyntheticEvent } from 'react';
import {
  Data,
  OnChange,
  OnError,
  OnRender,
  OnReset,
  OnSubmit,
  OnSuccess,
  Props,
  Reducer,
  Types
} from './spec';

const types: Types = {
  CHANGE: 'CHANGE',
  ERROR: 'ERROR',
  RENDER: 'RENDER',
  RESET: 'RESET',
  SUBMIT: 'SUBMIT',
  SUCCESS: 'SUCCESS',
};

const initialData: Data = {
  email: null,
  id: null,
  message: null,
  name: null,
  shouldSubmit: false,
  shouldRender: false,
};

const getFormData = (event: SyntheticEvent<HTMLFormElement>): Data => {
  const data = new FormData(event.currentTarget);

  const email = data.get('email') || null;
  const id = data.get('id') || null;
  const message = data.get('message') || null;
  const name = data.get('name') || null;
  const shouldSubmit = Boolean(email) && Boolean(message) && Boolean(name);

  return { email, id, message, name, shouldSubmit };
};

const Actions = (): Props => {
  const reducer: Reducer = (current, actions) => {
    const { data: next = {} as Data, type } = actions;

    const hasChange =
      Object.values(next).some((value) => value !== null) &&
      (next.email !== current.email ||
        next.id !== current.id ||
        next.message !== current.message ||
        next.name !== current.name);

    const data = {
      ...current,
      ...next,
      hasChange,
    };

    switch (type) {
      case types.CHANGE:
        return {
          ...data,
          shouldSubmit: false,
        };
      case types.ERROR:
        return {
          ...data,
          shouldSubmit: false,
        };
      case types.RENDER:
        return {
          ...data,
          shouldRender: true,
        };
      case types.RESET:
        return {
          ...initialData,
          shouldRender: true,
        };
      case types.SUBMIT:
        return {
          ...data,
          shouldSubmit: true,
        };
      case types.SUCCESS:
        return {
          ...data,
          shouldSubmit: false,
        };
      default:
        return current;
    }
  };

  const [data, dispatch] = useReducer(reducer, initialData, undefined);

  const onChange: OnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    dispatch({ type: types.CHANGE, data: getFormData(event) });
  };

  const onError: OnError = () => {
    dispatch({ type: types.ERROR });
  };

  const onRender: OnRender = () => {
    dispatch({ type: types.RENDER });
  };

  const onReset: OnReset = (event) => {
    dispatch({ type: types.RESET, data: getFormData(event) });
  };

  const onSubmit: OnSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: types.SUBMIT, data: getFormData(event) });
  };

  const onSuccess: OnSuccess = () => {
    dispatch({ type: types.SUCCESS });
  };

  return {
    data,
    onChange,
    onError,
    onRender,
    onReset,
    onSuccess,
    onSubmit,
  };
};

export default Actions;
