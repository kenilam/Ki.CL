import React, { useId } from 'react';

// Components
import { Layout, ListItem, Switch, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useDraftContext } from '@/views/experiments/factory-arm/draft-context';

const SecondStack: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { draft, setDraft } = useDraftContext();
  const id = useId();

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='1fr--max-content'
      gap='narrow'
    >
      <ListItem>
        <Text id={id} is='span'>
          {t('label', { context: 'second_stack' })}
        </Text>
        <Switch
          aria-labelledby={id}
          checked={draft.stacks === 2}
          onCheckedChange={(checked) =>
            setDraft({ ...draft, stacks: checked ? 2 : 1 })
          }
        />
      </ListItem>
    </Layout>
  );
};

export { SecondStack };
