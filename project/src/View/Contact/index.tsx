import resources from '$/resources';
import { Hidden, Input, TextArea } from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import { Route } from '@/Component/Router';
import Description from './Description';
import Title from './Title';
import CTA from './CTA';
import React from 'react';
import IContact from './spec';
import './Style';
import State from './State';
import * as API from '@/API';
import { url } from '@/API/Contact';

const {
  view: {
    contact: {
      content: { email, message, name },
      path,
    },
  },
} = resources;

const transitionType: ICSSTransition.Type = 'fade';

const renderFieldSteps: IContact.RenderField[] = [
  'title',
  'description',
  'name',
  'email',
  'message',
  'cta',
];

const Contact: React.FunctionComponent<IContact.Props> = () => {
  const {
    actions: { data, onError, onSuccess, ...actions },
    renderFields,
  } = State('title');

  const { shouldSubmit, success, ...params }: IContact.Actions.Data = data || {
    shouldSubmit: null,
    success: false,
    id: null,
    email,
    message,
    name,
  };

  return (
    <main data-routes='contact'>
      <API.ContactConfig transitionType='fade'>
        {({ data: config }) => (
          <form {...actions} action={url}>
            <Title
              {...renderFields.createState({
                renderFields: renderFieldSteps.slice(0, 2),
              })}
            />
            <Description
              {...renderFields.createState({
                renderFields: renderFieldSteps.slice(1, 3),
              })}
            />
            <Hidden useClassName={true}>
              <Input id='id' in={true} label='id' />
            </Hidden>
            <Input
              {...renderFields.createState({
                renderFields: renderFieldSteps.slice(2, 4),
                transitionType: 'slideFromLeft',
              })}
              {...name}
              autoFocus={true}
              required={true}
            />
            <Input
              {...renderFields.createState({
                renderFields: renderFieldSteps.slice(3, 5),
                transitionType: 'slideFromLeft',
              })}
              {...email}
              required={true}
            />
            <TextArea
              {...renderFields.createState({
                renderFields: renderFieldSteps.slice(4, 6),
                transitionType: 'slideUp',
              })}
              {...message}
              {...config.message}
              required={true}
            />
            <CTA
              {...renderFields.createState({
                renderFields: renderFieldSteps.slice(5),
              })}
              success={success}
            />
          </form>
        )}
      </API.ContactConfig>
      {shouldSubmit && (
        <API.Contact params={params}>
          {({ data, error, success }) => {
            if (error) {
              onError();
            }

            if (success) {
              onSuccess();
            }

            return <span>{data && data.result}</span>;
          }}
        </API.Contact>
      )}
    </main>
  );
};

export { path, transitionType };
export default (
  <Route path={path}>
    <Contact />
  </Route>
);
