import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Heading, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Sources } from './sources';

// Diagrams
import { picture } from './diagrams/picture';

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
      <Sources />
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
