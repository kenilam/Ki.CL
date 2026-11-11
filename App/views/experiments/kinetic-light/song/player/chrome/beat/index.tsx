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
import type { KineticLightBeat } from 'api/provider';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTransportContext } from '@/views/experiments/kinetic-light/song/player/context';

// Hooks
import { useSave } from '@/views/experiments/kinetic-light/song/player/use-save';

// Partials
import { Option } from './option';

// Constants
import { BEATS } from '@/views/experiments/kinetic-light/constants';

const Beat: React.FunctionComponent = () => {
  const save = useSave();
  const transport = useTransportContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem>
      <Select
        aria-label={t('label', { context: 'beat' })}
        inline
        onValueChange={(value) =>
          save('beat', value.toUpperCase() as KineticLightBeat)
        }
        value={transport.beat}
      >
        <SelectTrigger>
          <Tb.TbWaveSine aria-hidden />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {BEATS.map((beat) => {
            return <Option beat={beat} key={beat} />;
          })}
        </SelectContent>
      </Select>
    </ListItem>
  );
};

export { Beat };
