import resources from '$/resources';
import {CSSTransition, Input, TextArea} from '@/Component';
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

const transitionType: ICSSTransition.Type = 'fade';

const action = `${process.env.API_URL}/api/contact`;

const Contact: React.FunctionComponent<IAbout.Props> = () => {
  let childTransitionTimer: number;
  
  const [params, setParams] = useState<IContact.Params>(null);
  const [shouldRender, render] = useState<IContact.Render>(false);
  const [renderIndex, updateRenderIndex] = useState<IContact.RenderIndex>(0);
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get('email');
    const message = data.get('message');
    const name = data.get('name');
    
    event.preventDefault();
    
    setParams({email, message, name});
  };
  
  const onEntered = () => {
    render(true);
  };
  
  const onExit = () => {
    render(false);
  };
  
  const onChildEntering = (index: IContact.RenderIndex) => () => {
    childTransitionTimer = window.setTimeout(() => updateRenderIndex(index), 300);
  };
  
  const onChildExiting = (index: IContact.RenderIndex) => () => {
    childTransitionTimer = window.setTimeout(() => updateRenderIndex(index), 300);
  };
  
  useEffect(
    () => () => {
      window.clearTimeout(childTransitionTimer);
    },
    [renderIndex]
  );
  
  useEffect(
    () => {
      window.addEventListener('view-entered', onEntered);
      window.addEventListener('view-exit', onExit);
      
      return () => {
        window.removeEventListener('view-entered', onEntered);
        window.removeEventListener('view-exit', onExit);
      }
    },
    [render]
  );
  
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
        
        promise.then(() => {
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
        <CSSTransition
          in={shouldRender}
          type='slideFromLeft'
          onEntering={onChildEntering(0)}
          onExiting={onChildExiting(0)}
        >
          <h1>{title}</h1>
        </CSSTransition>
        <CSSTransition
          in={shouldRender && renderIndex >= 0}
          type='slideFromLeft'
          onEntering={onChildEntering(1)}
          onExiting={onChildExiting(1)}
        >
          <p>{message}</p>
        </CSSTransition>
        <Input
          autoFocus={true}
          id='name'
          label='Name'
          name='name'
          onEntering={onChildEntering(2)}
          onExiting={onChildExiting(2)}
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
          onEntering={onChildEntering(3)}
          onExiting={onChildExiting(3)}
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
          onEntering={onChildEntering(4)}
          onExiting={onChildExiting(4)}
          placeholder='Write your messages here'
          transitionIn={shouldRender && renderIndex >= 3}
          transitionType='slideUp'
          required={true}
        />
        <CSSTransition
          in={shouldRender && renderIndex >= 4}
          type='slideUp'
          onEntering={onChildEntering(5)}
          onExiting={onChildExiting(5)}
        >
          <button type='submit'>send</button>
        </CSSTransition>
        <CSSTransition
          in={shouldRender && renderIndex >= 4}
          type='slideUp'
          onEntering={onChildEntering(5)}
          onExiting={onChildExiting(5)}
        >
          <button type='reset'>reset</button>
        </CSSTransition>
      </form>
    </main>
  );
};

const viewEnteredEvent = new Event('view-entered');
const viewExitEvent = new Event('view-exited');

const onEntering = () => {
  window.dispatchEvent(viewEnteredEvent);
};
const onExit = () => window.dispatchEvent(viewExitEvent);

export {path, transitionType};
export default (
  <Route path={path}>
    <Contact onEntering={onEntering} onExit={onExit} />
  </Route>
);
