import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

const STORIES = [
  { context: 'every_request', paragraphs: ['every_request'] },
  { context: 'mixed', paragraphs: ['mixed'] },
  { context: 'lost', paragraphs: ['lost', 'lost_cause'] },
  { context: 'plurals', paragraphs: ['plurals'] },
  { context: 'quota', paragraphs: ['quota'] },
] as const;

const Wrong: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.wrong.title')}
        </Heading>
      }
    >
      {STORIES.map(({ context, paragraphs }) => {
        return (
          <React.Fragment key={context}>
            <Heading is='h3' lookLike='h2'>
              {t('article.wrong.title', { context })}
            </Heading>
            {paragraphs.map(
              (paragraph: (typeof STORIES)[number]['paragraphs'][number]) => {
                return (
                  <Text is='p' key={paragraph}>
                    <Markdown>{t(`article.wrong.${paragraph}`)}</Markdown>
                  </Text>
                );
              }
            )}
          </React.Fragment>
        );
      })}
    </Details>
  );
};

export { Wrong };
