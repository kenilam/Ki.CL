import {view} from '$resources/data.json';
import {createHashHistory} from 'history';
import {useEffect} from 'react';

const {body} = document;
const defaultRoute = view.home.name.toLowerCase();

const handler = () => {
  const {enteredRoutes} = body.dataset;
  
  if (enteredRoutes) {
    body.dataset.exitedRoutes = enteredRoutes;
  }
  
  body.dataset.enteredRoutes = (
    window.location.hash.substr(2) || defaultRoute
  ).replace('/', '.');
};

function History() {
  useEffect(() => {
    const remove = createHashHistory().listen(handler);
    
    return () => {
      remove();
    }
  });
  
  handler();
}

export default History;
