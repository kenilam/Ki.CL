import React from 'react';

// Components
import { Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Email } from './email';
import { Phone } from './phone';
import { Profiles } from './profiles';

/** Two lines, as on the printed page: where and how to write, then the profiles. */
const Contact: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <Layout gap='narrow'>
      <address className='kicl-font-style-normal'>
        <Text className='kicl-print-break-inside-avoid' dense>
          {t('location')}
        </Text>
        <Layout display='flex' wrap>
          <Text className='kicl-print-break-inside-avoid' dense>
            <Email />
            <Phone />
            <Profiles />
          </Text>
        </Layout>
      </address>
    </Layout>
  );
};

export { Contact };
