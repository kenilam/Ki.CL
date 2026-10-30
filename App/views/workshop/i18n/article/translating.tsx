import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Details,
  Diagram,
  Heading,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Diagrams
import { limits } from './diagrams/limits';

const TOKENS = [
  'token_placeholders',
  'token_references',
  'token_code',
  'token_markdown',
] as const;

const PARAGRAPHS = ['checks', 'size', 'plurals', 'notes'] as const;

const Translating: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return limits(t);
  }, [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.translating.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.translating.job')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.translating.prompt')}</Markdown>
      </Text>
      <Text is='p'>{t('article.translating.tokens')}</Text>
      <List gap='narrower' listStyleType='disc'>
        {TOKENS.map((token) => {
          return (
            <ListItem key={token}>
              <Text is='span'>
                <Markdown>
                  {t(`article.translating.${token}`, { nest: false })}
                </Markdown>
              </Text>
            </ListItem>
          );
        })}
      </List>
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text is='p' key={paragraph}>
            <Markdown>{t(`article.translating.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
      <Text is='p'>
        <Markdown>{t('article.translating.providers')}</Markdown>
      </Text>
      <Diagram spec={spec} />
    </Details>
  );
};

export { Translating };
