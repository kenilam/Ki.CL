import { useReducer, SyntheticEvent } from "react";
import Spec from "./spec";

const types: Spec.Types = {
  CHANGE: "CHANGE",
  ERROR: "ERROR",
  RENDER: "RENDER",
  RESET: "RESET",
  SUBMIT: "SUBMIT",
  SUCCESS: "SUCCESS",
};

const initialData: Spec.Data = {
  email: null,
  id: null,
  message: null,
  name: null,
  shouldSubmit: false,
  shouldRender: false,
};

const getFormData = (event: SyntheticEvent<HTMLFormElement>): Spec.Data => {
  const data = new FormData(event.currentTarget);

  const email = data.get("email") || null;
  const id = data.get("id") || null;
  const message = data.get("message") || null;
  const name = data.get("name") || null;
  const shouldSubmit = Boolean(email) && Boolean(message) && Boolean(name);

  return { email, id, message, name, shouldSubmit };
};

const Actions = (): Spec.Props => {
  const reducer: Spec.Reducer = (current, actions) => {
    const { data: next = {} as Spec.Data, type } = actions;

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

  const onChange: Spec.OnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    dispatch({ type: types.CHANGE, data: getFormData(event) });
  };

  const onError: Spec.OnError = () => {
    dispatch({ type: types.ERROR });
  };

  const onRender: Spec.OnRender = () => {
    dispatch({ type: types.RENDER });
  };

  const onReset: Spec.OnReset = (event) => {
    dispatch({ type: types.RESET, data: getFormData(event) });
  };

  const onSubmit: Spec.OnSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: types.SUBMIT, data: getFormData(event) });
  };

  const onSuccess: Spec.OnSuccess = () => {
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
