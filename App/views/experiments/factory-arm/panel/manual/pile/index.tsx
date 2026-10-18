import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Button,
  Heading,
  Layout,
  List,
  ListItem,
  Select,
  SelectItem,
  Switch,
  Text,
} from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

const LAYERS = [1, 2, 3, 4, 5];

/**
 * How the incoming cases are built for the next run: how many layers, the
 * seed that picks each layer's case type (or a random one), and whether a
 * second stack comes in behind the arm. One setting a row, its name on the
 * left and its control on the right.
 */
const Pile: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { draft, setDraft } = useSetup();
  const id = { layers: useId(), second: useId(), title: useId() };
  const { pile, stacks } = draft;

  // Each setting a row of its list: what it is, then its control.
  const row = (label: React.ReactNode, control: React.ReactNode) => (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='1fr--max-content'
      gap='narrow'
    >
      <ListItem>
        {label}
        {control}
      </ListItem>
    </Layout>
  );

  return (
    <Layout gap='narrow'>
      <section aria-labelledby={id.title}>
        <Heading dense id={id.title} is='h2' lookLike='h5'>
          {t('title', { context: 'cases' })}
        </Heading>

        <List gap='narrow'>
          {row(
            <label className='kicl-font-size-small' htmlFor={id.layers}>
              {t('label', { context: 'layers' })}
            </label>,
            <Select
              id={id.layers}
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
              {t('label', { context: 'seed' })}{' '}
              <span className='kicl-font-family-mono'>{pile.seed}</span>
            </Text>,
            <Button
              before={<Ri.RiShuffleLine aria-hidden />}
              onClick={() =>
                setDraft({
                  ...draft,
                  pile: { ...pile, seed: Math.floor(Math.random() * 1000) },
                })
              }
              size='small'
              variant='ghost'
            >
              {t('action', { context: 'random' })}
            </Button>
          )}

          {row(
            <Text className='kicl-font-size-small' id={id.second} is='span'>
              {t('label', { context: 'second_stack' })}
            </Text>,
            <Switch
              aria-labelledby={id.second}
              checked={stacks === 2}
              onCheckedChange={(checked) =>
                setDraft({ ...draft, stacks: checked ? 2 : 1 })
              }
            />
          )}
        </List>
      </section>
    </Layout>
  );
};

export { Pile };
