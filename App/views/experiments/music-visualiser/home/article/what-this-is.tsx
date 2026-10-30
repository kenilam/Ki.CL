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
        <Heading dense is='h3' lookLike='h1'>
          {common('title', { context: 'what_this_is' })}
        </Heading>
      }
    >
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.what_this_is.experiment')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.what_this_is.browser')}
      </Text>
    </Details>
  );
};

export { WhatThisIs };
