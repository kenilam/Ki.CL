import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, List, ListItem, Text } from 'design/components';

const NEEDS = ['source', 'backend', 'platform', 'complete', 'no_code'] as const;

const Why: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      gap='narrow'
      open
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.why.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.why.rule')}</Text>
      <Text is='p'>{t('article.why.intro')}</Text>
      <List gap='narrower'>
        {NEEDS.map((need) => {
          return (
            <ListItem key={need}>
              <Text is='span'>{t(`article.why.${need}`)}</Text>
            </ListItem>
          );
        })}
      </List>
    </Details>
  );
};

export { Why };
