import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import {
  ListItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from 'design/components';

// API
import type { KineticLightVoice } from 'api/provider';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTransportContext } from '@/views/experiments/kinetic-light/song/player/context';

// Hooks
import { useSave } from '@/views/experiments/kinetic-light/song/player/use-save';

// Partials
import { Option } from './option';

// Constants
import { VOICES } from '@/views/experiments/kinetic-light/constants';

const Sound: React.FunctionComponent = () => {
  const save = useSave();
  const transport = useTransportContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem>
      <Select
        aria-label={t('label', { context: 'voice' })}
        inline
        onValueChange={(value) =>
          save('voice', value.toUpperCase() as KineticLightVoice)
        }
        value={transport.voice}
      >
        <SelectTrigger>
          <Tb.TbMusic aria-hidden />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {VOICES.map((voice) => {
            return <Option key={voice} voice={voice} />;
          })}
        </SelectContent>
      </Select>
    </ListItem>
  );
};

export { Sound };
