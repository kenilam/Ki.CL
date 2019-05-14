import {view} from '$resources/data.json';
import {createHashHistory, Location, parsePath} from 'history';
import {useLayoutEffect} from 'react';

const {body} = document;
const defaultRoute = view.home.name.toLowerCase();
const history = createHashHistory();

const handler = (location: Location) => {
  const {enteredRoutes} = body.dataset;
  
  if (enteredRoutes) {
    body.dataset.exitedRoute = enteredRoutes;
  }
  
  body.dataset.enteredRoutes = (
    location.pathname.substr(1) || defaultRoute
  ).replace('/', '.');
};

function History() {
  useLayoutEffect(() => {
    const remove = history.listen(handler);
    
    return () => {
      remove();
    }
  });
  
  handler(parsePath(window.location.pathname));
}

export default History;
