import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { List, ListItem } from 'design/components';

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

const CHIP_CLASS_NAME = classNames(CHIP, 'kicl-font-size-small');

/** What each dot colour means, read out after the label. */
const STATE_LABEL: Record<DotState, string> = {
  done: 'done',
  idle: 'not started',
  queued: 'queued',
  retry: 'retrying',
  running: 'running',
};

const STATE_COLOR: Record<DotState, string> = {
  done: 'kicl-background-color-green',
  idle: 'kicl-background-color-grey-dark',
  queued: 'kicl-background-color-grey-light',
  retry: 'kicl-background-color-orange',
  running: 'kicl-background-color-yellow',
};

/** One dot per tracked item, then the free-form chip. */
const Status: React.FunctionComponent = () => {
  const { chip, chipLabel, dotLabels, dots } = useSimulation();

  return (
    <List className={CLASS_NAME} display='flex' gap='narrow' is='ul' wrap>
      {dotLabels.map((label, index) => (
        <ListItem
          alignItems='center'
          className={CHIP_CLASS_NAME}
          display='flex'
          key={label}
        >
          <span
            className={classNames(
              DOT,
              'kicl-aspect-ratio-square',
              'kicl-border-radius-full',
              STATE_COLOR[dots[index]]
            )}
          />
          {label}
          <span className='kicl-hidden'>, {STATE_LABEL[dots[index]]}</span>
        </ListItem>
      ))}
      <ListItem alignItems='center' className={CHIP_CLASS_NAME} display='flex'>
        {chipLabel} · {chip}
      </ListItem>
    </List>
  );
};

export { CLASS_NAME, Status };
