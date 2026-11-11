import { useState } from 'react';

// Context
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Partials
import { useCurrent } from '@/views/experiments/factory-arm/workspace/panel/use-current';

/** The name typed for the new preset, and saving the cell under it. */
const useName = () => {
  const { save } = usePresetsContext();
  const current = useCurrent();
  const [name, setName] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    save(current(), name);
    setName('');
  };

  return { name, setName, submit };
};

export { useName };
