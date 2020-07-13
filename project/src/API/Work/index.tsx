import resources from '$/resources';
import { Match, Props } from './spec';
import { Asynchronizer } from '@/Component';
import { useRouteMatch } from '@/Component/Router';
import React, { FunctionComponent } from 'react';

const url = `${process.env.API_URL}/api/works/`;

const {
  view: {
    works: {
      view: {
        work: { path },
      },
    },
  },
} = resources;

const Work: FunctionComponent<Props> = ({ children, transitionType, ...rest }) => {
  const match: Match = useRouteMatch({ path });

  if (!match) {
    return null;
  }

  const {
    params: { work },
  } = match;

  return (
    <Asynchronizer {...rest} transitionType={transitionType} awaitFor={`${url}${work}`}>
      {children}
    </Asynchronizer>
  );
}

export default Work;
