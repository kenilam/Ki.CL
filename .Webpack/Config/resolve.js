import { path as appRoot } from 'app-root-path';

import fs from 'fs';

import { context } from './entry';

const alias = {};

fs.readdirSync(context).forEach(dir => {
  const path = `${context}/${dir}`;

  if (!fs.statSync(path).isDirectory()) {
    return;
  }

  alias[dir] = `${context}/${dir}`;
});

alias['^'] = appRoot;
alias['~'] = context;

alias.assets = `${appRoot}/project/assets`;
alias.content = `${appRoot}/project/content`;

const resolve = {
  modules: [`${appRoot}/node_modules`],
  extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.xml'],
  alias
};

export default {
  resolve
};
