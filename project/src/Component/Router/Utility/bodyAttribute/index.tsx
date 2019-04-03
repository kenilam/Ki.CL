import * as H from 'history';

import {view} from 'resources/data.json';

import {direction} from './spec';

const {home: {name}} = view;

const add = (direction: direction, {pathname}: H.Location) => {
  document.body.dataset[`${direction}Routes`] = pathname.substr(1).replace('/', '.') || name.toLowerCase();
};

const remove = (direction: direction) => {
  delete document.body.dataset[`${direction}Routes`];
};

export {add, remove};
