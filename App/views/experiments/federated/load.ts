import { loadRemote, registerRemotes } from '@module-federation/runtime';

const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const registered = new Set<string>();

// Registered when first asked for, so a new experiment needs no host release.
const load = async <Module>({ name, module }: { name: string; module: 'client' | 'preview' }) => {
  if (!NAME.test(name)) {
    throw new Error(`${name} is not an experiment's name.`);
  }

  if (!registered.has(name)) {
    registerRemotes([{ name, entry: `/experiments/${name}/client/remoteEntry.js`, type: 'module' }]);
    registered.add(name);
  }

  const loaded = await loadRemote<Module>(`${name}/${module}`);

  if (!loaded) {
    throw new Error(`${name} has no ${module}.`);
  }

  return loaded;
};

export { load };
