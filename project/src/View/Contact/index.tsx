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

const transitionType: ICSSTransition.Type = 'slideUp';

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
      <form action={action}>
        <h1>{title}</h1>
        <p>{message}</p>
        <label htmlFor='name'>
          <span>Name</span>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Your name here'
            required={true}
          />
        </label>
        <label htmlFor='email'>
          <span>Email</span>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Your email here'
            required={true}
          />
        </label>
        <label htmlFor='message'>
          <span>Messages</span>
          <textarea
            id='message'
            minLength={30}
            maxLength={600}
            name='message'
            placeholder='Write your messages here'
            required={true}
          />
        </label>
        <button type='submit'>send</button>
        <button type='reset'>reset</button>
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
