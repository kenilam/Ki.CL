import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Direction } from './direction';
import { Stories } from './stories';

const Rtl: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.rtl.title')}>
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
