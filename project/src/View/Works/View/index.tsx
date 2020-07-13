import resources from '$/resources';
import { types } from '@/Component/CSSTransition/Type';
import Router, { useRouteMatch } from '@/Component/Router';
import React, { FunctionComponent, useState, useEffect } from 'react';
import Work from './Work';
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

const View: FunctionComponent<Props> = ({ data }) => {
  const routes = data.map(({ id }) => id.toString());

  const match: Match = useRouteMatch(path);
  const [previous, setPrevious] = useState<number>(null);
  const [transitionType, setTransitionType] = useState(types.SlideUp);

  if (!match) {
    return null;
  }

  useEffect(
    () => {
      const { params: { work } } = match;

      const index = routes.indexOf(work);

      if (index === previous) {
        return;
      }
      
      setTransitionType(
        index < previous ? types.SlideDown : types.SlideUp
      );
      
      setPrevious(index);
    },
    [ match, routes ]
  );

  return (
    <Router
      appear={true}
      routeIndex={1}
      transitionType={transitionType}
    >
      {Work}
    </Router>
  );
};

export default View;
