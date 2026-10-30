import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, List, ListItem, Text } from 'design/components';

const LIMITS = ['review', 'variants', 'switching', 'html'] as const;

const Limits: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.limits.title')}
        </Heading>
      }
    >
      <List gap='narrower' listStyleType='disc'>
        {LIMITS.map((limit) => {
          return (
            <ListItem key={limit}>
              <Text is='span'>{t(`article.limits.${limit}`)}</Text>
            </ListItem>
          );
        })}
      </List>
    </Details>
  );
};

export { Limits };
