import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, List, ListItem, Markdown, Text } from 'design/components';

const PARAGRAPHS = ['header', 'list', 'matching', 'complete'] as const;

const EXAMPLES = ['untranslated', 'incomplete', 'script', 'excluded'] as const;

const Picking: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <>
      <Heading is='h3' lookLike='h2'>
        {t('article.picking.title')}
      </Heading>
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text is='p' key={paragraph}>
            <Markdown>{t(`article.picking.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
      <Text is='p'>{t('article.picking.examples')}</Text>
      <List gap='narrower'>
        {EXAMPLES.map((context) => {
          return (
            <ListItem key={context}>
              <Text is='span'>
                <Markdown>{t('article.picking.example', { context })}</Markdown>
              </Text>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export { Picking };
