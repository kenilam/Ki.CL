import {
  path as appRoot
} from 'app-root-path';

import fs from 'fs';

import {
  contextRoot,
  context
} from '!/Config/entry';

const alias = {
  '^': appRoot,
  '~': context
};

fs.readdirSync(contextRoot).forEach((dir) => {
  const path = `${contextRoot}/${dir}`;

  if (!fs.statSync(path).isDirectory()) {
    return;
  }

  alias[dir] = path;
});

fs.readdirSync(context).forEach((dir) => {
  const path = `${context}/${dir}`;

  if (!fs.statSync(path).isDirectory()) {
    return;
  }

  alias[dir] = path;
});

const resolve = {
  modules: [`${appRoot}/node_modules`],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.json', '.xml'],
  alias,
};

export {
  resolve
};
export default {
  resolve,
};
