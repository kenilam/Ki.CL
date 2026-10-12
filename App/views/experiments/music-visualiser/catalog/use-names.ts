import { useTranslation } from 'react-i18next';

import type { Track } from '.';

/** A slug or a file name as a key: `late-night` is `late_night`. */
const toKey = (text: string) => text.replace(/[^a-z0-9]+/g, '_');

/**
 * A track's title and its category's name. The catalogue holds where each
 * file is, and the names are in the namespace. Named by a default so the
 * types accept a key that is built from the track.
 */
const useNames = ({ id, type }: Pick<Track, 'id' | 'type'>) => {
  const { t } = useTranslation('music-visualiser');

  const category = toKey(type);

  return {
    category: t(`category_${category}`, { defaultValue: type }),
    title: t(`track.${category}.${toKey(id)}`, { defaultValue: id }),
  };
};

export { useNames };
