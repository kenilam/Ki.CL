import React from 'react';

// Components
import { Button, CardAction } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { useName } from '@/views/experiments/factory-arm/workspace/panel/presets/preset/use-name';
import { usePlay } from './use-play';

// Spec
import type * as Spec from '@/views/experiments/factory-arm/spec';

type Props = Pick<Spec.Preset, 'id'>;

/** Builds the cell from the preset, or starts it over when the running cell came from it. */
const Play: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('factory-arm');
  const name = useName(id);
  const { current, play } = usePlay(id);

  return (
    <CardAction>
      <Button
        aria-label={t('action', {
          context: current ? 'restart' : 'run',
          name,
        })}
        onClick={play}
        size='small'
        variant='secondary'
      >
        {current ? (
          <Tb.TbRotate aria-hidden />
        ) : (
          <Tb.TbPlayerPlayFilled aria-hidden />
        )}
      </Button>
    </CardAction>
  );
};

export { Play };
