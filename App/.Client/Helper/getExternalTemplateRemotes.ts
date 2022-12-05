import type { UserConfig } from 'vite';

import type { Remotes } from './getRemotes';
import extractUrlAndGlobal from './extractUrlAndGlobal';

const getExternalTemplateRemotes = (remotes: Remotes) => {
  const remoteEntries = Object.values(remotes);

  const externalTemplateRemotes: Exclude<
    UserConfig['plugins'],
    undefined
  >[number] = {
    name: 'grid:external-template-remotes',
    enforce: 'post',
    transform(cached) {
      if (!remoteEntries.every((remoteEntry) => cached.includes(remoteEntry))) {
        return cached;
      }

      let code = `${cached}`;

      remoteEntries.forEach((remoteEntry) => {
        const [expression] = extractUrlAndGlobal(remoteEntry);

        code = code.replace(remoteEntry, expression);
      });

      return code;
    },
  };

  return externalTemplateRemotes;
};

export default getExternalTemplateRemotes;
