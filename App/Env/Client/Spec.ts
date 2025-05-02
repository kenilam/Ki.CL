import { Names } from './constants';

type Env = {
  [name in Names]?: string;
};

type Value = {
  env?: Env;
  error?: Error;
  loading: boolean;
};

export { Names, type Env, type Value };
export default {};
