import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading } from 'design/components';

// Partials
import { SetupProvider } from './setup';
import { Workspace } from './workspace';

/** Kept in the lazy chunk so three.js ships only with this route. */
const FactoryArm: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <SetupProvider>
      <Heading is='h1' className='kicl-hidden'>
        {t('title')}
      </Heading>

      <Workspace />
    </SetupProvider>
  );
};

export { FactoryArm };
