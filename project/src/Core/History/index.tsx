import {view} from '$resources/data.json';
import {createHashHistory} from 'history';
import {IHandler, IRemoveListener} from './spec';

let remover: IRemoveListener;

const {body} = document;

const defaultRoute = view.home.name.toLowerCase();
const history = createHashHistory();

const handler: IHandler = location => {
  const {enteredRoutes} = body.dataset;
  
  if (enteredRoutes) {
    body.dataset.exitedRoute = enteredRoutes;
  }
  
  body.dataset.enteredRoutes = (location.pathname.substr(1) || defaultRoute).replace('/', '.');
};

const create = () => {
  remover = history.listen(handler);
  handler(history.location, null);
};

const remove = () => {
  if (!remover) {
    return;
  }
  
  remover();
};

export default {create, remove};
