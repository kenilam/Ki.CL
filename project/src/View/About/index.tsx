import resources from '$/resources';
import {Asynchronizer, Logo, Navigation} from '@/Component';
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

const api = `${process.env.API_URL}/api/about`;
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
      <Asynchronizer awaitFor={api} pendingFor={!rendered}>
        {
          (data: IAbout.Data) => (
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
      </Asynchronizer>
    </main>
  );
};

export {path, transitionType};
export default (
  <Route path={path}>
    <About />
  </Route>
);
