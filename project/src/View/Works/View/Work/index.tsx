import resources from '$/resources';
import { Route, useRouteMatch } from '@/Component/Router';
import React, { FunctionComponent } from 'react';
import IWork from './spec';

const {
  view: {
    works: {
      view: {
        work: { path },
      },
    },
  },
} = resources;

const Work: FunctionComponent<IWork.Props> = () => {
  const {
    params: { projectId },
  }: IWork.Match = useRouteMatch({ path });

  return <section data-routes={`works.${projectId}`}>{projectId}</section>;
};

export default (
  <Route path={path} exact={true}>
    <Work />
  </Route>
);
