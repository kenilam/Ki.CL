import React, { useId } from 'react';

// Components
import { ListItem, Select } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useDraftContext } from '@/views/experiments/factory-arm/draft-context';

// Partials
import { Option } from './option';

// Constants
import { LAYERS } from './constants';

const Layers: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { draft, setDraft } = useDraftContext();
  const id = useId();

  return (
    <ListItem
      alignItems='center'
      autoFlow='column'
      frames='1fr--max-content'
      gap='narrow'
    >
      <label htmlFor={id}>{t('label', { context: 'layers' })}</label>
      <Select
        id={id}
        onValueChange={(value) =>
          setDraft({
            ...draft,
            pile: { ...draft.pile, layers: Number(value) },
          })
        }
        value={String(draft.pile.layers)}
      >
        {LAYERS.map((layers) => {
          return <Option key={layers} layers={layers} />;
        })}
      </Select>
    </ListItem>
  );
};

export { Layers };
