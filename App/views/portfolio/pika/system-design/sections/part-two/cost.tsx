import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Text } from 'design/components';

/** Draft tiers and hard budgets. */
const Cost: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'cost' })}
      </Heading>
      <Text>{t('part_two.cost.ladder')}</Text>
      <Text>{t('part_two.cost.budget')}</Text>
    </>
  );
};

export { Cost };
