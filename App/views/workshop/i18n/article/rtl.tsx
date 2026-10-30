import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Diagrams
import { direction } from './diagrams/direction';

const STORIES = [
  { context: 'arrows', paragraphs: ['arrows', 'arrows_fix'] },
  { context: 'switch', paragraphs: ['switch'] },
  { context: 'code', paragraphs: ['code'] },
  { context: 'flags', paragraphs: ['flags'] },
  { context: 'calendar', paragraphs: ['calendar', 'calendar_language'] },
  { context: 'english', paragraphs: ['english'] },
] as const;

const Rtl: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return direction(t);
  }, [t]);

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
      <Diagram spec={spec} />
      {STORIES.map(({ context, paragraphs }) => {
        return (
          <React.Fragment key={context}>
            <Heading is='h3' lookLike='h2'>
              {t('article.rtl.title', { context })}
            </Heading>
            {paragraphs.map(
              (paragraph: (typeof STORIES)[number]['paragraphs'][number]) => {
                return (
                  <Text is='p' key={paragraph}>
                    <Markdown>{t(`article.rtl.${paragraph}`)}</Markdown>
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

export { Rtl };
