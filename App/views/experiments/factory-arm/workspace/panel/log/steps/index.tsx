import React from 'react';

// Components
import { List } from 'design/components';

// Context
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { type Entry } from '@/views/experiments/factory-arm/spec';

// Partials
import { Step } from './step';

type Props = Pick<Entry, 'run'>;

/** A run's steps in the log, newest first. */
const Steps: React.FunctionComponent<Props> = ({ run }) => {
  const { log } = useLogContext();

  return (
    <List gap='narrower' is='ol'>
      {log
        .filter((entry) => {
          return entry.run === run;
        })
        .map(({ id }) => {
          return <Step id={id} key={id} />;
        })}
    </List>
  );
};

export { Steps };
