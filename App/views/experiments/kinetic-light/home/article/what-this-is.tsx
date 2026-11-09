import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

const WhatThisIs: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      open
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {translations.common.t('title', { context: 'what_this_is' })}
        </Heading>
      }
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
