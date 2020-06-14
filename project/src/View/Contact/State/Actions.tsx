import { useReducer, SyntheticEvent } from "react";
import Spec from "./spec";

const types: Spec.Types = {
  CHANGE: "CHANGE",
  ERROR: "ERROR",
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
  const reducer: Spec.Reducer = (form, actions) => {
    const { type, data } = actions;

    const fields = data || ({} as Spec.Data);

    const hasChange =
      Object.values(fields).filter((value) => value !== null).length > 0 &&
      (fields.email !== form.email ||
        fields.id !== form.id ||
        fields.message !== form.message ||
        fields.name !== form.name);

    switch (type) {
      case types.CHANGE:
        return {
          ...fields,
          hasChange,
          shouldSubmit: false,
        };
      case types.ERROR:
        return {
          ...fields,
          hasChange,
          shouldSubmit: false,
        };
      case types.RESET:
        return initialData;
      case types.SUBMIT:
        return {
          ...fields,
          hasChange,
          shouldSubmit: true,
        };
      case types.SUCCESS:
        return {
          ...fields,
          hasChange,
          shouldSubmit: false,
        };
      default:
        return form;
    }
  };

  const [data, dispatch] = useReducer(reducer, initialData, undefined);

  const onChange: Spec.OnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    dispatch({ type: types.CHANGE, data: getFormData(event) });
  };

  const onError: Spec.OnError = () => {
    dispatch({ type: types.ERROR });
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
    onReset,
    onSuccess,
    onSubmit,
  };
};

export default Actions;
