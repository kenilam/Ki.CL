import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Text } from 'design/components';

/** Rubric-based evaluation and replay. */
const Testing: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'testing' })}
      </Heading>
      <Text>{t('part_two.testing.rubrics')}</Text>
      <Text>{t('part_two.testing.scoring')}</Text>
      <Text>{t('part_two.testing.replay')}</Text>
    </>
  );
};

export { Testing };
