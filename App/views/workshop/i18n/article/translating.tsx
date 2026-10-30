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

const TOKENS = [
  'token_placeholders',
  'token_references',
  'token_code',
  'token_markdown',
] as const;

const PARAGRAPHS = ['checks', 'plurals', 'notes', 'providers'] as const;

const Translating: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.translating.title')}
        </Heading>
      }
    >
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.translating.job')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.translating.prompt')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.translating.tokens')}
      </Text>
      <List
        className='kicl-max-inline-size-columns-8'
        gap='narrower'
        listStyleType='disc'
      >
        {TOKENS.map((token) => {
          return (
            <ListItem key={token}>
              <Text is='span'>
                <Markdown>{t(`article.translating.${token}`)}</Markdown>
              </Text>
            </ListItem>
          );
        })}
      </List>
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text
            className='kicl-max-inline-size-columns-8'
            is='p'
            key={paragraph}
          >
            <Markdown>{t(`article.translating.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
    </Details>
  );
};

export { Translating };
