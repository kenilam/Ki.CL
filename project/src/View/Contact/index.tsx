import resources from '$/resources';
import {CSSTransition, Input, TextArea} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import {Fetch} from '@/Helper';
import React, {FormEvent, useEffect, useState} from 'react';
import IContact from './spec';
import './Style';

const {
  view: {
    contact: {path, content: {title, message}}
  }
} = resources;

const transitionType: ICSSTransition.Type = 'fade';

const action = `${process.env.API_URL}/api/contact`;

const Contact: React.FunctionComponent<IContact.Props> = () => {
  let renderIndexTimer: number;
  
  const [isValid, validate] =  useState<IContact.IsValid>(false);
  const [params, setParams] = useState<IContact.Params>(null);
  const [shouldRender, render] = useState<IContact.Render>(false);
  const [renderIndex, updateRenderIndex] = useState<IContact.RenderIndex>(-1);
  
  const onChange = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const message = data.get('message');
    const name = data.get('name');
  
    validate(Boolean(email && message && name));
  };
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!isValid) {
      return;
    }
    
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const message = data.get('message');
    const name = data.get('name');
    
    event.preventDefault();
    
    setParams({email, message, name});
  };
  
  const onEntering = () => {
    render(true);
  };
  
  const onExit = () => {
    render(false);
  };
  
  const changeRenderIndex = (index: IContact.RenderIndex) => () => {
    window.clearTimeout(renderIndexTimer);
    renderIndexTimer = window.setTimeout(() => updateRenderIndex(index), 300);
  };
  
  const reset_renderIndex = changeRenderIndex(-1);
  const set_renderIndex_to_0 = changeRenderIndex(0);
  const set_renderIndex_to_1 = changeRenderIndex(1);
  const set_renderIndex_to_2 = changeRenderIndex(2);
  const set_renderIndex_to_3 = changeRenderIndex(3);
  const set_renderIndex_to_4 = changeRenderIndex(4);
  const set_renderIndex_to_5 = changeRenderIndex(5);
  
  useEffect(
    () => {
      let cancelFetch: IContact.CancelFetch;
      
      if (isValid && params) {
        const {cancel, promise} = Fetch(
          action,
          {
            body: JSON.stringify(params),
            method: 'POST'
          }
        );
        
        cancelFetch = cancel;
        
        promise.then(setParams);
      }
      
      window.addEventListener('contact.entering', onEntering);
      window.addEventListener('contact.exit', onExit);
  
      return () => {
        window.clearTimeout(renderIndexTimer);
        
        window.removeEventListener('contact.entering', onEntering);
        window.removeEventListener('contact.exit', onExit);
        
        cancelFetch && cancelFetch();
      };
    }
  );
  
  return (
    <main data-routes='contact'>
      <form action={action} onChange={onChange} onSubmit={onSubmit}>
        <CSSTransition
          in={shouldRender}
          type='slideFromLeft'
          onEntering={set_renderIndex_to_0}
          onExiting={reset_renderIndex}
        >
          <h1>{title}</h1>
        </CSSTransition>
        <CSSTransition
          in={shouldRender && renderIndex >= 0}
          type='slideFromLeft'
          onEntering={set_renderIndex_to_1}
          onExiting={set_renderIndex_to_0}
        >
          <p>{message}</p>
        </CSSTransition>
        <Input
          autoFocus={true}
          id='name'
          label='Name'
          name='name'
          onEntering={set_renderIndex_to_2}
          onExiting={set_renderIndex_to_1}
          placeholder='Your name here'
          required={true}
          transitionIn={shouldRender && renderIndex >= 1}
          transitionType='slideFromLeft'
          type='text'
        />
        <Input
          id='email'
          label='Email'
          name='email'
          onEntering={set_renderIndex_to_3}
          onExiting={set_renderIndex_to_2}
          placeholder='Your email here'
          required={true}
          transitionIn={shouldRender && renderIndex >= 2}
          transitionType='slideFromLeft'
          type='email'
        />
        <TextArea
          id='message'
          label='Messages'
          maxLength={600}
          minLength={30}
          name='message'
          onEntering={set_renderIndex_to_4}
          onExiting={set_renderIndex_to_3}
          placeholder='Write your messages here'
          transitionIn={shouldRender && renderIndex >= 3}
          transitionType='slideUp'
          required={true}
        />
        <CSSTransition
          in={shouldRender && renderIndex >= 4}
          type='slideUp'
          onEntering={set_renderIndex_to_5}
          onExiting={set_renderIndex_to_4}
        >
          <button type='submit' disabled={!isValid}>send</button>
        </CSSTransition>
        <CSSTransition
          in={shouldRender && renderIndex >= 4}
          type='slideUp'
          onEntering={set_renderIndex_to_5}
          onExiting={set_renderIndex_to_4}
        >
          <button type='reset'>reset</button>
        </CSSTransition>
      </form>
    </main>
  );
};

export {path, transitionType};
export default (
  <Route path={path}>
    <Contact/>
  </Route>
);
