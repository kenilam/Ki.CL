import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Partials
import { Answering } from './answering';
import { Picking } from './picking';
import { Ready } from './ready';
import { Translating } from './translating';

// Diagrams
import { overview } from './diagrams/overview';

const How: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return overview(t);
  }, [t]);

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.how.title')}
        </Heading>
      }
    >
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.how.browser')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.how.parts')}
      </Text>
      <Diagram spec={spec} />
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.how.flow')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.how.source')}
      </Text>
      <Picking />
      <Answering />
      <Translating />
      <Ready />
    </Details>
  );
};

export { How };
