import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Details,
  Heading,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

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
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.why.rule')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.why.intro')}
      </Text>
      <List
        className='kicl-max-inline-size-columns-8'
        gap='narrower'
        listStyleType='disc'
      >
        {NEEDS.map((need) => {
          return (
            <ListItem key={need}>
              <Text is='span'>
                <Markdown>{t(`article.why.${need}`)}</Markdown>
              </Text>
            </ListItem>
          );
        })}
      </List>
    </Details>
  );
};

export { Why };
