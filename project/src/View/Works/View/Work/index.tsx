import resources from '$/resources';
import { useRouteMatch, Route } from '@/Components/Router';
import React, { FunctionComponent } from 'react';
import Spec from './spec';

const {
  view: {
    works: {
      view: {
        work: { path },
      },
    },
  },
} = resources;

const Work: FunctionComponent<Spec.Props> = () => {
  const {
    params: { projectId },
  }: Spec.Match = useRouteMatch({ path });

  return <section data-routes={`works.${projectId}`}>{projectId}</section>;
};

export default (
  <Route path={path} exact={true}>
    <Work />
  </Route>
);
