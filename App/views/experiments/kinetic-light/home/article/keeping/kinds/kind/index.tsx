import React from 'react';

// Components
import { Heading, ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { KINDS } from '@/views/experiments/kinetic-light/home/article/keeping/kinds/constants';

type Props = { context: (typeof KINDS)[number] };

const Kind: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem autoFlow='row' gap='none'>
      <Heading dense is='h4'>
        {t('kind', { context })}
      </Heading>
      <Text is='p'>{t('article.keeping.kept', { context })}</Text>
    </ListItem>
  );
};

export { Kind };
