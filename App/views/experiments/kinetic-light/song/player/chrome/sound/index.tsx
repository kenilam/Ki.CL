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
import type { KineticLightVoice } from 'api/provider';

// Context
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';
import type { Voice } from '@/views/experiments/kinetic-light/song/player/use-transport';

const VOICES: Voice[] = ['grand', 'upright', 'sixteen', 'wurlitzer', 'synth'];

const Sound: React.FunctionComponent = () => {
  const { save, transport } = usePlayerContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <Select
      aria-label={t('label', { context: 'voice' })}
      inline
      onValueChange={(value) =>
        save('voice', value.toUpperCase() as KineticLightVoice)
      }
      value={transport.voice}
    >
      <SelectTrigger>
        <Bs.BsMusicNote aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {VOICES.map((voice) => (
          <SelectItem key={voice} value={voice}>
            {t('voice', { context: voice })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { Sound };
