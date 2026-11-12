import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** What this is: the opening section, open on arrival. */
const WhatThisIs: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    musicVisualiser: useTranslation('music-visualiser'),
  };

  return (
    <Details
      heading='h3'
      open
      summary={translations.common.t('title', { context: 'what_this_is' })}
    >
      <Text is='p'>
        {translations.musicVisualiser.t('article.what_this_is.experiment')}
      </Text>
      <Text is='p'>
        {translations.musicVisualiser.t('article.what_this_is.browser')}
      </Text>
    </Details>
  );
};

export { WhatThisIs };
