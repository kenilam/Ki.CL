import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Text } from 'design/components';

/** App Studio and the guardrails around self-serve publishing. */
const Growth: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'growth' })}
      </Heading>
      <Text>{t('part_one.growth.studio')}</Text>
      <Text>{t('part_one.growth.governance')}</Text>
    </>
  );
};

export { Growth };
