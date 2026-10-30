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
import { overview } from './diagrams/overview';

const PARTS = ['part_files', 'part_mongodb', 'part_job'] as const;

const How: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return overview(t);
  }, [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.how.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.how.browser')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.how.select')}</Markdown>
      </Text>
      <Text is='p'>{t('article.how.parts')}</Text>
      <List gap='narrower' is='ol' listStyleType='decimal'>
        {PARTS.map((part) => {
          return (
            <ListItem key={part}>
              <Text is='span'>
                <Markdown>{t(`article.how.${part}`)}</Markdown>
              </Text>
            </ListItem>
          );
        })}
      </List>
      <Diagram spec={spec} />
      <Text is='p'>{t('article.how.startup')}</Text>
      <Text is='p'>{t('article.how.source')}</Text>
    </Details>
  );
};

export { How };
