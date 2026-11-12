import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** What this is: the opening section, open on arrival. */
const WhatThisIs: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    imageAgent: useTranslation('image-agent'),
  };

  return (
    <Details
      heading='h3'
      open
      summary={translations.common.t('title', { context: 'what_this_is' })}
    >
      <Text is='p'>
        {translations.imageAgent.t('article.what_this_is.summary')}
      </Text>
      <Text is='p'>
        {translations.imageAgent.t('article.what_this_is.why')}
      </Text>
      <Text is='p'>
        {translations.imageAgent.t('article.what_this_is.code')}
      </Text>
    </Details>
  );
};

export { WhatThisIs };
