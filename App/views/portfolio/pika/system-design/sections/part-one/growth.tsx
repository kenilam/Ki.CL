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
      <Heading className='kicl-font-size-large' is='h3'>
        {t('title', { context: 'growth' })}
      </Heading>
      <Text>{t('part_one.growth.studio')}</Text>
      <Text>{t('part_one.growth.governance')}</Text>
    </>
  );
};

export { Growth };
