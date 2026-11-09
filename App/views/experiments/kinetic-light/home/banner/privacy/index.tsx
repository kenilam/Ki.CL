import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Card, Details, Text } from 'design/components';

const Privacy: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Card
      className='kicl-font-size-small'
      is='aside'
      size={5}
      variant='secondary'
    >
      <Details gap='narrow' summary={t('title', { context: 'privacy' })}>
        <Text is='p' dense variant='secondary'>
          {t('privacy')}
        </Text>
      </Details>
    </Card>
  );
};

export { Privacy };
