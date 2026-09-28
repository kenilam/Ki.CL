import React from 'react';

// Components
import {
  Button,
  Heading,
  Layout,
  Select,
  SelectItem,
  Switch,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

const LAYERS = [1, 2, 3, 4, 5];

const ID = {
  layers: 'factory-arm-layers',
  second: 'factory-arm-second',
  title: 'factory-arm-pile',
};

/**
 * How the incoming cases are built for the next run: how many layers, the
 * seed that picks each layer's case type (or a random one), and whether a
 * second stack comes in behind the arm. One setting a row, its name on the
 * left and its control on the right.
 */
const Pile: React.FunctionComponent = () => {
  const { draft, setDraft } = useSetup();
  const { pile, stacks } = draft;

  const row = (label: React.ReactNode, control: React.ReactNode) => (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='1fr--max-content'
      gap='narrow'
    >
      <div>
        {label}
        {control}
      </div>
    </Layout>
  );

  return (
    <section aria-labelledby={ID.title}>
      <Layout gap='narrow'>
        <div>
          <Heading dense id={ID.title} is='h2' lookLike='h5'>
            {COPY.panel.pile.title}
          </Heading>

          {row(
            <label className='kicl-font-size-small' htmlFor={ID.layers}>
              {COPY.panel.pile.layers}
            </label>,
            <Select
              id={ID.layers}
              onValueChange={(value) =>
                setDraft({ ...draft, pile: { ...pile, layers: Number(value) } })
              }
              value={String(pile.layers)}
            >
              {LAYERS.map((layers) => (
                <SelectItem key={layers} value={String(layers)}>
                  {layers}
                </SelectItem>
              ))}
            </Select>
          )}

          {row(
            <Text className='kicl-font-size-small' is='span'>
              {COPY.panel.pile.seed}{' '}
              <span className='kicl-font-family-mono'>{pile.seed}</span>
            </Text>,
            <Button
              onClick={() =>
                setDraft({
                  ...draft,
                  pile: { ...pile, seed: Math.floor(Math.random() * 1000) },
                })
              }
              size='small'
              variant='ghost'
            >
              <Ri.RiShuffleLine aria-hidden />
              {/* In an element: a button of only an icon and bare text reads as an icon button, and goes round. */}
              <span>{COPY.panel.pile.random}</span>
            </Button>
          )}

          {row(
            <Text className='kicl-font-size-small' id={ID.second} is='span'>
              {COPY.panel.pile.second}
            </Text>,
            <Switch
              aria-labelledby={ID.second}
              checked={stacks === 2}
              onCheckedChange={(checked) =>
                setDraft({ ...draft, stacks: checked ? 2 : 1 })
              }
            />
          )}
        </div>
      </Layout>
    </section>
  );
};

export { Pile };
