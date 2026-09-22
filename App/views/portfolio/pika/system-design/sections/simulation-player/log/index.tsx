import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { List, ListItem, Text } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

// Context
import { useSimulation } from '@/views/portfolio/pika/system-design/sections/simulation-player/context';

const CLASS_NAME = `${SYSTEM_DESIGN}__simulation-log`;

/** Numbered event log that keeps the latest entry in view. */
const Log: React.FunctionComponent = () => {
  const { idleHint, seen } = useSimulation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [seen.length]);

  return (
    <div
      className={classNames(
        CLASS_NAME,
        'kicl-font-family-mono',
        'kicl-font-size-small',
        'kicl-margin-block-start-narrow'
      )}
      ref={ref}
      role='log'
    >
      {seen.length === 0 ? (
        <Text dense variant='secondary'>
          {idleHint}
        </Text>
      ) : (
        <List gap='none' is='ol'>
          {seen.map((s, index) => (
            <ListItem key={index}>
              {/* The list numbers the entries for assistive tech. */}
              <span aria-hidden>{String(index + 1).padStart(2, '0')} · </span>
              {s.log}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export { CLASS_NAME, Log };
