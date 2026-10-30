import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

/** What this is: the opening section, open on arrival. */
const WhatThisIs: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
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
        {t('article.what_this_is.summary')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.what_this_is.why')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.what_this_is.code')}
      </Text>
    </Details>
  );
};

export { WhatThisIs };
