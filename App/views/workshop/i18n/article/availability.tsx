import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Diagrams
import { release } from './diagrams/release';

const PARAGRAPHS = [
  'complete',
  'run',
  'switcher',
  'adding',
  'batch',
  'batch_order',
] as const;

const Availability: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return release(t);
  }, [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.availability.title')}
        </Heading>
      }
    >
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text is='p' key={paragraph}>
            <Markdown>{t(`article.availability.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
      <Diagram spec={spec} />
    </Details>
  );
};

export { Availability };
