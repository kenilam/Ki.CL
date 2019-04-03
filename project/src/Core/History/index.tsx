import {createHashHistory} from 'history';
import {view} from 'resources/data.json';
import {IHandler, IRemoveListener} from "./spec";

let remover: IRemoveListener;

const handler: IHandler = location => {
  const {enterRoutes} = body.dataset;
  
  if (enterRoutes) {
    body.dataset.exitRoute = enterRoutes;
  }
  
  body.dataset.enterRoutes = (location.pathname.substr(1) || defaultRoute).replace('/', '.');
};

const {body} = document;

const defaultRoute = view.home.name.toLowerCase();
const history = createHashHistory();

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
