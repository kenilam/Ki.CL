import { UserConfig } from 'vite';

import { path as root } from 'app-root-path';

import Fixtures from './Fixtures';

import { getConfig } from './.Client';

type Config = Exclude<UserConfig['preview'] | UserConfig['server'], undefined>;

let proxy: Config['proxy'] = {};

Object.values({ ...Fixtures }).forEach((config) => {
  proxy = { ...config.proxy };
});

export default getConfig({
  open: true,
  proxy,
  root,
});
