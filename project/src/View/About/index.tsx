import resources from '$/resources';
import * as API from '@/API';
import {Logo, Navigation} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import React, {useEffect, useState} from 'react';
import IAbout from './spec';
import './Style';

const {
  view: {
    about: {path, content: {action, heading}}
  }
} = resources;

const transitionType: ICSSTransition.Type = 'slideFromRight';

const About: React.FunctionComponent<IAbout.Props> = () => {
  const [rendered, isRendered] = useState(false);
  
  const fetchAPI = () => {
    isRendered(true);
  };
  
  useEffect(
    () => {
      window.addEventListener('about.entering', fetchAPI);
      
      return () => {
        window.removeEventListener('about.entering', fetchAPI);
      }
    }
  );
  
  return (
    <main data-routes='about'>
      <API.About pendingFor={!rendered}>
        {
          data => (
            <article>
              <Logo />
              <h2>{heading}</h2>
              <p>{data.sections.About}</p>
              <Navigation
                inline={true}
                items={[
                  {children: action.name, to: action.path}
                ]}
              />
            </article>
          )
        }
      </API.About>
    </main>
  );
};

export {path, transitionType};
export default (
  <Route path={path}>
    <About />
  </Route>
);
