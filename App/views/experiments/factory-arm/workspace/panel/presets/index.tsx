import React from 'react';

// Components
import { List } from 'design/components';

// Context
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Partials
import { Preset } from './preset';
import { Unsaved } from './unsaved';

/**
 * The presets, the ones that ship with the page and the operator's own.
 * Once the cell is changed, a footer offers to save it as a new one.
 */
const Presets: React.FunctionComponent = () => {
  const { presets } = usePresetsContext();

  return (
    <>
      <List gap='narrow'>
        {presets.map(({ id }) => {
          return <Preset id={id} key={id} />;
        })}
      </List>

      <Unsaved />
    </>
  );
};

export { Presets };
