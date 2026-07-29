import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Names, PATH } from './constants';

import * as Spec from './Spec';

type Value = Spec.Value;

const DEFAULT: Value = {
  loading: false,
};

const Context = React.createContext(DEFAULT);

const getEnv = async (observer?: AbortController) => {
  try {
    const response = await window.fetch(`${window.location.origin}${PATH}`, {
      signal: observer?.signal,
    });

    const env = (await response.json()) as Value['env'];

    return env;
  } catch (error) {
    // Keep the original: `new Error(error as string)` stringified it to
    // "[object Object]" and threw away the stack that said what actually failed.
    throw new Error('Failed to load client environment', { cause: error });
  }
};

const EnvProvider: React.FunctionComponent<
  PropsWithChildren<PropsWithChildren>
> = ({ children }) => {
  const [env, setEnv] = useState<Value['env']>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const env = await getEnv();

      if (!env) {
        throw new Error('Fail to get env');
      }

      setEnv(env);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (env || error || loading) {
      return;
    }

    fetch();
  }, [env, error, loading]);

  const value = { env, error, loading };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useEnvContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { type Value, Names, PATH, EnvProvider, getEnv, useEnvContext };
export default {};
