import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'design/components';

// API
import type { KineticLightBeat } from 'api/provider';

// Context
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';
import type { Beat as Value } from '@/views/experiments/kinetic-light/song/player/use-transport';

const BEATS: Value[] = [
  'none',
  'kit',
  'lofi',
  'percussion',
  'linndrum',
  'machine',
];

const Beat: React.FunctionComponent = () => {
  const { save, transport } = usePlayerContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <Select
      aria-label={t('label', { context: 'beat' })}
      inline
      onValueChange={(value) =>
        save('beat', value.toUpperCase() as KineticLightBeat)
      }
      value={transport.beat}
    >
      <SelectTrigger>
        <Bs.BsSoundwave aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {BEATS.map((beat) => (
          <SelectItem key={beat} value={beat}>
            {t('beat', { context: beat })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { Beat };
