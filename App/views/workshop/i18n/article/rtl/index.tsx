import React from 'react';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Direction } from './direction';
import { Stories } from './stories';

const Rtl: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.rtl.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.rtl.intro')}</Text>
      <Text is='p'>
        <Markdown>{t('article.rtl.dir')}</Markdown>
      </Text>
      <Text is='p'>{t('article.rtl.gaps')}</Text>
      <Direction />
      <Stories />
    </Details>
  );
};

export { Rtl };
