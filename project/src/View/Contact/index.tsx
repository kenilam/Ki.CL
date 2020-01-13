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
    contact: {path, content: {title, description}}
  }
} = resources;

const transitionType: ICSSTransition.Type = 'fade';

const action = `${process.env.API_URL}/api/contact`;

const Contact: React.FunctionComponent<IContact.Props> = () => {
  let renderIndexTimer: number;

  const [isValid, validate] =  useState<IContact.IsValid>(false);
  const [params, setParams] = useState<IContact.Params>(null);
  const [shouldRender, render] = useState<IContact.Render>(false);
  const [renderFields, updateRenderFields] = useState<IContact.Field[]>([]);

  const shouldRenderField = (field: IContact.Field) => shouldRender && renderFields.includes(field);
  const addRenderField = (field: IContact.Field, asCallback = true) => {
    const update = () => updateRenderFields(Array.from(new Set([...renderFields, field])));

    if (asCallback) {
      return () => setTimeout(update, 300);
    }

    update();
  }
;
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
    addRenderField('title', false);
  };

  const onExit = () => {
    render(false);
    updateRenderFields([]);
  };

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

      addEventListener('contact.entering', onEntering);
      addEventListener('contact.exit', onExit);

      return () => {
        cancelFetch && cancelFetch();
        
        clearTimeout(renderIndexTimer);

        removeEventListener('contact.entering', onEntering);
        removeEventListener('contact.exit', onExit);
      };
    }
  );

  return (
    <main data-routes='contact'>
      <form action={action} onChange={onChange} onSubmit={onSubmit}>
        <CSSTransition
          in={shouldRenderField('title')}
          type='slideFromLeft'
          onEntering={addRenderField('description')}
        >
          <h1>{title}</h1>
        </CSSTransition>
        <CSSTransition
          in={shouldRenderField('description')}
          type='slideFromLeft'
          onEntering={addRenderField('name')}
        >
          <p>{description}</p>
        </CSSTransition>
        <Input
          autoFocus={true}
          id='name'
          label='Name'
          name='name'
          onEntering={addRenderField('email')}
          placeholder='Your name here'
          required={true}
          transitionIn={shouldRenderField('name')}
          transitionType='slideFromLeft'
          type='text'
        />
        <Input
          id='email'
          label='Email'
          name='email'
          onEntering={addRenderField('message')}
          placeholder='Your email here'
          required={true}
          transitionIn={shouldRenderField('email')}
          transitionType='slideFromLeft'
          type='email'
        />
        <TextArea
          id='message'
          label='Messages'
          maxLength={600}
          minLength={30}
          name='message'
          onEntering={addRenderField('cta')}
          placeholder='Write your messages here'
          transitionIn={shouldRenderField('message')}
          transitionType='slideUp'
          required={true}
        />
        <CSSTransition
          in={shouldRenderField('cta')}
          type='slideUp'
        >
          <div className='cta'>
            <button type='submit' disabled={!isValid}>send</button>
            <button type='reset'>reset</button>
          </div>
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
