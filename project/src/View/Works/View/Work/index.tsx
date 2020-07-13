import resources from '$/resources';
import { useRouteMatch, Route } from '@/Component/Router';
import API from '@/API/Work';
import React, { FunctionComponent } from 'react';
import './Style';
import { Match, Props } from './spec';

const {
  view: {
    works: {
      view: {
        work: { path },
      },
    },
  },
} = resources;

const Work: FunctionComponent<Props> = () => {
  const match: Match = useRouteMatch({ path });

  if (!match) {
    return null;
  }

  const {
    params: { work },
  } = match;

  return (
    <section data-routes={`works.${work}`}>
      <API>
        {
          ({ result }) => (
            <article>
              <h1>
                {result?.toString()}
              </h1>
            </article>
          )
        }
      </API>
    </section>
  );
};

export default (
  <Route path={path} exact={true}>
    <Work />
  </Route>
);
