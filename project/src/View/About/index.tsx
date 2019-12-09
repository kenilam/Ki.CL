import resources from '$/resources';
import {Asynchronizer, CloseButton, Logo, Navigation} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route, useHistory} from '@/Component/Router';
import React, {useEffect, useState} from 'react';
import IAbout from './spec';
import './Style';

const {
  view: {
    about: {path, content: {action, heading}}
  }
} = resources;

const api = `${process.env.API_URL}/api/about`;
const transitionType: ICSSTransition.Type = 'slideFromRight';

const Abort: React.FunctionComponent<IAbout.Props> = () => {
  const history = useHistory();
  const [shouldRender, rendered] = useState(false);
  
  const fetchAPI = () => {
    rendered(true);
  };
  
  useEffect(
    () => {
      window.addEventListener('Abort.Rendered', fetchAPI);
      
      return () => {
        window.removeEventListener('Abort.Rendered', fetchAPI);
      }
    }
  );
  
  return (
    <main data-routes='about'>
      <Asynchronizer awaitFor={api} pendingFor={!shouldRender}>
        {
          (data: IAbout.Data) => (
            <article>
              <Logo />
              <h2>{heading}</h2>
              <p>{data.sections.About}</p>
              <CloseButton onExit={history.goBack} />
              <Navigation
                inline={true}
                items={[
                  {children: action.name, to: action.path}
                ]}
              />
            </article>
          )
        }
      </Asynchronizer>
    </main>
  );
};

const TransitionEvent = new Event('Abort.Rendered');
const onEntered = () => {
  window.dispatchEvent(TransitionEvent);
};

export {path, transitionType};
export default (
  <Route path={path}>
    <Abort onEntered={onEntered} />
  </Route>
);
