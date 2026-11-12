import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const WhatThisIs: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };

  return (
    <Details
      heading='h3'
      open
      summary={translations.common.t('title', { context: 'what_this_is' })}
    >
      <Text is='p'>
        {translations.kineticLight.t('article.what_this_is.piano')}
      </Text>
      <Text is='p'>
        {translations.kineticLight.t('article.what_this_is.idea')}
      </Text>
      <Text is='p'>
        {translations.kineticLight.t('article.what_this_is.presence')}
      </Text>
      <Text is='p'>
        {translations.kineticLight.t('article.what_this_is.start')}
      </Text>
      <Text is='p'>
        {translations.kineticLight.t('article.what_this_is.summary')}
      </Text>
      <Text is='p'>
        {translations.kineticLight.t('article.what_this_is.three')}
      </Text>
    </Details>
  );
};

export { WhatThisIs };
