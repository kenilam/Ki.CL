import resources from '$/resources';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import {Fetch} from '@/Helper';
import React, {FormEvent, useEffect, useState} from 'react';
import IContact from './spec';
import IAbout from './spec';
import './Style';

const {
  view: {
    contact: {path, content: {title, message}}
  }
} = resources;

const transitionType: ICSSTransition.Type = 'slideDown';

const action = `${process.env.API_URL}/api/contact`;

const Contact: React.FunctionComponent<IAbout.Props> = () => {
  const [params, setParams] = useState<IContact.Params>(null);
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get('email');
    const message = data.get('message');
    const name = data.get('name');
    
    event.preventDefault();
    
    setParams({email, message, name});
  };
  
  useEffect(
    () => {
      let cancelFetch: IContact.CancelFetch;
      
      if (params) {
        const {cancel, promise} = Fetch(
          action,
          {
            body: JSON.stringify(params),
            method: 'POST'
          }
        );
        
        cancelFetch = cancel;
        
        promise.then(data => {
          console.log(data);
          setParams(null);
        });
      }
      
      return () => {
        cancelFetch && cancelFetch();
      };
    },
    [params]
  );
  
  return (
    <main data-routes='contact' onSubmit={onSubmit}>
      <h1>{title}</h1>
      <p>{message}</p>
      <form action={action}>
        <input name='name' type='text' required={true} />
        <input name='email' type='email' required={true} />
        <input name='message' type='text' required={true} />
        <button type='submit'>send</button>
      </form>
    </main>
  );
};

export {path, transitionType};
export default (
  <Route path={path}>
    <Contact />
  </Route>
);
