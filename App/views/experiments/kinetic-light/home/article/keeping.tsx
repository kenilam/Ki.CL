import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, List, ListItem, Text } from 'design/components';

const KINDS = ['sheet', 'file'] as const;

const Keeping: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('title', { context: 'privacy' })}
        </Heading>
      }
    >
      <Text is='p'>{t('article.keeping.intro')}</Text>
      <List gap='narrow' listStyleType='disc'>
        {KINDS.map((context) => (
          <ListItem autoFlow='row' gap='none' key={context}>
            <Heading dense is='h4'>
              {t('kind', { context })}
            </Heading>
            <Text is='p'>{t('article.keeping.kept', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.keeping.days')}</Text>
    </Details>
  );
};

export { Keeping };
