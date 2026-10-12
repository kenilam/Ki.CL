import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

/** What this is: the opening section, open on arrival. */
const WhatThisIs: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');
  const { t: common } = useTranslation();

  return (
    <Details
      gap='narrow'
      open
      summary={
        <Heading className='kicl-font-size-large' dense is='h3'>
          {common('title', { context: 'what_this_is' })}
        </Heading>
      }
    >
      <Text is='p'>{t('article.what_this_is.experiment')}</Text>
      <Text is='p'>{t('article.what_this_is.browser')}</Text>
    </Details>
  );
};

export { WhatThisIs };
