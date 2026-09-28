import React, { useEffect, useRef } from 'react';

// Components
import { Card } from '@/components';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Partials
import { Log } from './log';
import { Manual } from './manual';
import { Presets } from './presets';
import { Tabs } from './tabs';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME,
  COPY,
  PANEL,
} from '@/views/experiments/factory-arm/constants';

/**
 * How the next run is set up, from a preset or by hand, and a log of every
 * step the cell takes. It floats over the stage and folds away; only its own
 * buttons open and close it, so a click on the stage leaves it be. It
 * outlives the runs, open as it was left.
 */
const Panel: React.FunctionComponent = () => {
  const { open, setOpen, tab } = useSetup();
  const panel = useRef<HTMLElement>(null);

  // Only the open state it mounts with counts; after that the popover leads.
  const opening = useRef(open);

  useEffect(() => {
    const element = panel.current;

    if (!element) {
      return;
    }

    if (opening.current && !element.matches(':popover-open')) {
      element.showPopover();
    }

    const toggle = (event: Event) =>
      setOpen((event as ToggleEvent).newState === 'open');

    element.addEventListener('toggle', toggle);

    return () => element.removeEventListener('toggle', toggle);
  }, [setOpen]);

  return (
    <Card
      aria-label={COPY.panel.label}
      className={`${CLASS_NAME}__panel kicl-position-fixed kicl-z-index-floating`}
      id={PANEL}
      is='aside'
      popover='manual'
      ref={panel}
    >
      <Tabs />
      {tab === 'preset' && <Presets />}
      {tab === 'manual' && <Manual />}
      {tab === 'log' && <Log />}
    </Card>
  );
};

export { Panel };
