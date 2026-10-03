import React from 'react';
import classNames from 'classnames';

// Components
import { Layout, Switch, SwitchLabel, Text } from '@/components';

// Brains
import type { Mode, Status as StatusType } from 'arm/brains';

// Partials
import { Status } from './status';

// Constants
import { COPY } from './constants';

type Props = {
  mode: Mode;
  status: StatusType | null;
  onModeChange: (mode: Mode) => void;
  /** The arms on the twin, drawn green on the floor. */
  twinned: string[];
};

/** Moves the first arms between their classic brains and physical AI on the twin. */
const Brains: React.FunctionComponent<Props> = ({
  mode,
  onModeChange,
  status,
  twinned,
}) => {
  const checked = mode === 'physical';

  return (
    <Layout autoFlow='row' justifyItems='start'>
      <footer>
        <Switch
          size='sm'
          checked={checked}
          onCheckedChange={(on) => onModeChange(on ? 'physical' : 'classic')}
        >
          <SwitchLabel
            className={classNames({
              'kicl-color-confirm': checked,
            })}
          >
            {COPY.brains.physical}
          </SwitchLabel>
        </Switch>
        <Status mode={mode} status={status} />
        {twinned.length > 0 && (
          <Text className='kicl-font-size-small' variant='secondary'>
            {`${COPY.brains.twinned}: ${twinned.join(', ')}`}
          </Text>
        )}
      </footer>
    </Layout>
  );
};

export { Brains };
