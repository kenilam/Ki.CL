import * as H from 'history';

import { direction } from './spec';

import { view } from 'resources/data.json';

const { home: { name } } = view;

const add = ( direction: direction, { pathname }: H.Location ) => {
  document.body.dataset[`${direction}Routes`] = pathname.substr( 1 ).replace( '/', '.' ) || name.toLowerCase();
}

const remove = ( direction: direction ) => {
  delete document.body.dataset[`${direction}Routes`];
}

export { add, remove };
