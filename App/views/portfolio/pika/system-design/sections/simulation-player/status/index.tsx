import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

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

const STATE_COLOR: Record<DotState, string> = {
  done: 'kicl-background-color-green',
  idle: 'kicl-background-color-grey-700',
  queued: 'kicl-background-color-grey-300',
  retry: 'kicl-background-color-orange',
  running: 'kicl-background-color-yellow',
};

/** One dot per tracked item, then the chip. */
const Status: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const { chip, dotLabels, dots } = useSimulation();

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
          {/* What the dot's colour means, read out after the label. */}
          <span className='kicl-hidden'>
            {t('state', { context: dots[index] })}
          </span>
        </ListItem>
      ))}
      <ListItem alignItems='center' className={CHIP_CLASS_NAME} display='flex'>
        {chip}
      </ListItem>
    </List>
  );
};

export { CLASS_NAME, Status };
