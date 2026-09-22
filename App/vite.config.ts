import appRoot from 'app-root-path';

import { UserConfig } from 'vite';

import { Env } from './env';

import { getConfig } from './.client';

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
