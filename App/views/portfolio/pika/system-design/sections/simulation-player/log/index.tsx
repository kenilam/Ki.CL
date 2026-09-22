import React, { useEffect, useRef } from 'react';

// Components
import { Text } from '@/components';

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
    <div className={CLASS_NAME} ref={ref} role='log'>
      {seen.length === 0 ? (
        <Text dense variant='secondary'>
          {idleHint}
        </Text>
      ) : (
        seen.map((s, index) => (
          <div key={index}>
            {String(index + 1).padStart(2, '0')} · {s.log}
          </div>
        ))
      )}
    </div>
  );
};

export { CLASS_NAME, Log };
