import resources from '$/resources';
import {Input, TextArea} from "@/Component";
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import Description from './Description';
import Title from './Title';
import CTA from './CTA';
import React from 'react';
import IContact from './spec';
import './Style';
import State from './State';
import * as API from '@/API';
import {url} from '@/API/Contact';

const {
  view: {
    contact: {
      content: { email, message, name }, path
    }
  }
} = resources;

const transitionType: ICSSTransition.Type = 'fade';

const renderFieldSteps: IContact.RenderField[] = ['title', 'description', 'name', 'email', 'message', 'cta'];

const Contact: React.FunctionComponent<IContact.Props> = () => {
  const { actions: { data: { shouldSubmit, ...params }, ...actions }, renderFields } = State('title');
  
  return (
    <main data-routes='contact'>
      <API.ContactConfig transitionType='fade'>
        {
          config => (
            <form {...actions} action={url}>
              <Title {...renderFields.createState(renderFieldSteps.slice(0, 2))}/>
              <Description {...renderFields.createState(renderFieldSteps.slice(1, 3))}/>
              <Input {...renderFields.createState(renderFieldSteps.slice(2, 4), 'slideFromLeft')} {...name} type='name' required={true} autoFocus={true}/>
              <Input {...renderFields.createState(renderFieldSteps.slice(3, 5), 'slideFromLeft')} {...email} type='email' required={true}/>
              <TextArea {...renderFields.createState(renderFieldSteps.slice(4, 6), 'slideUp')} {...message} {...config.message} required={true}/>
              <CTA {...renderFields.createState(renderFieldSteps.slice(5))}/>
            </form>
          )
        }
      </API.ContactConfig>
      {
        shouldSubmit && (
          <API.Contact params={params}>
            {
              () => <span>Done</span>
            }
          </API.Contact>
        )
      }
    </main>
  )
};

export {path, transitionType};
export default (
  <Route path={path}>
    <Contact/>
  </Route>
);
