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
  Text,
} from 'design/components';

// Diagrams
import { picture } from './diagrams/picture';

const SOURCES = ['musicxml', 'midi', 'sheet'] as const;

const Picture: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const spec = useMemo(() => picture(t), [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.picture.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.picture.source')}</Text>
      <List gap='narrow' listStyleType='disc'>
        {SOURCES.map((context) => (
          <ListItem autoFlow='row' gap='none' key={context}>
            <Heading dense is='h4'>
              {t('kind', { context })}
            </Heading>
            <Text is='p'>{t('article.picture.from', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.picture.engrave')}</Text>
      <Text is='p'>{t('article.picture.floor')}</Text>
      <Text is='p'>{t('article.picture.line')}</Text>
      <Text is='p'>{t('article.picture.balls')}</Text>
      <Text is='p'>{t('article.picture.clock')}</Text>
      <Diagram spec={spec} />
      <Text is='p'>{t('article.picture.camera')}</Text>
      <Text is='p'>{t('article.picture.loop')}</Text>
    </Details>
  );
};

export { Picture };
