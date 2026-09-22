import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

// Context
import {
  type DotState,
  useSimulation,
} from '@/views/portfolio/pika/system-design/sections/simulation-player/context';

const CLASS_NAME = `${SYSTEM_DESIGN}__simulation-status`;
const CHIP = `${SYSTEM_DESIGN}__simulation-chip`;
const DOT = `${SYSTEM_DESIGN}__simulation-dot`;

/** What each dot colour means, read out after the label. */
const STATE_LABEL: Record<DotState, string> = {
  done: 'done',
  idle: 'not started',
  queued: 'queued',
  retry: 'retrying',
  running: 'running',
};

/** One dot per tracked item, then the free-form chip. */
const Status: React.FunctionComponent = () => {
  const { chip, chipLabel, dotLabels, dots } = useSimulation();

  return (
    <div className={CLASS_NAME}>
      {dotLabels.map((label, index) => (
        <span className={classNames(CHIP, 'kicl-font-size-small')} key={label}>
          <span className={classNames(DOT, `${DOT}--${dots[index]}`)} />
          {label}
          <span className='kicl-hidden'>, {STATE_LABEL[dots[index]]}</span>
        </span>
      ))}
      <span className={classNames(CHIP, 'kicl-font-size-small')}>
        {chipLabel} · {chip}
      </span>
    </div>
  );
};

export { CLASS_NAME, Status };
