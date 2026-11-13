import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { TERMS } from '@/views/workshop/architecture/article/terminology/terms/constants';

type Props = { term: (typeof TERMS)[number] };

const Term: React.FunctionComponent<Props> = ({ term }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.terms.${term}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Term };
