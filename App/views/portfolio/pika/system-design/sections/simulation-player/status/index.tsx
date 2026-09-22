import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

// Context
import { useSimulation } from '@/views/portfolio/pika/system-design/sections/simulation-player/context';

const CLASS_NAME = `${SYSTEM_DESIGN}__simulation-status`;
const CHIP = `${SYSTEM_DESIGN}__simulation-chip`;
const DOT = `${SYSTEM_DESIGN}__simulation-dot`;

/** One dot per tracked item, then the free-form chip. */
const Status: React.FunctionComponent = () => {
  const { chip, chipLabel, dotLabels, dots } = useSimulation();

  return (
    <div className={CLASS_NAME}>
      {dotLabels.map((label, index) => (
        <span className={CHIP} key={label}>
          <span className={classNames(DOT, `${DOT}--${dots[index]}`)} />
          {label}
        </span>
      ))}
      <span className={CHIP}>
        {chipLabel} · {chip}
      </span>
    </div>
  );
};

export { CLASS_NAME, Status };
