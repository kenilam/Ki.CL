import IContact from "@/View/Contact/spec";
import {SyntheticEvent, useReducer} from "react";

const initialData: IContact.Actions.Data = {
  email: null,
  shouldSubmit: false,
  message: null,
  name: null
};

const getFormData = (event: SyntheticEvent<HTMLFormElement>) => {
  const data = new FormData(event.currentTarget);
  
  const email = data.get('email') || null;
  const message = data.get('message') || null;
  const name = data.get('name') || null;
  const shouldSubmit = Boolean(email) && Boolean(message) && Boolean(name);
  
  return { email, shouldSubmit, message, name }
};

const Actions = () => {
  const reducer: IContact.Actions.Reducer = (oldData, actions) => {
    const { type, data } = actions;
    
    switch (type) {
      case 'CHANGE': return {...data, shouldSubmit: false};
      case 'RESET': return initialData;
      case 'SUBMIT': return data;
      default: return oldData;
    }
    
  };
  
  const [data, dispatch] = useReducer(
    reducer,
    initialData,
    undefined
  );
  
  const onChange: IContact.Actions.OnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    dispatch({ type: 'CHANGE', data: getFormData(event) });
  };
  
  const onReset: IContact.Actions.OnReset = () => {
    dispatch({ type: 'RESET' });
  };
  
  const onSubmit: IContact.Actions.OnSubmit = event => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT', data: getFormData(event) });
  };
  
  return { data: (data as IContact.Actions.Data), onChange, onReset, onSubmit }
};

export default Actions;
