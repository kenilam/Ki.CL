import appRoot from 'app-root-path';

import { UserConfig } from 'vite';

import Env from './Env';

import { getConfig } from './.Client';

type Config = Exclude<UserConfig['preview'] | UserConfig['server'], undefined>;

let proxy: Config['proxy'] = {};

Object.values({ ...Env }).forEach((config) => {
  proxy = {
    ...proxy,
    ...config.proxy,
  };
});

export default getConfig({
  proxy,
  root: appRoot.path,
});
