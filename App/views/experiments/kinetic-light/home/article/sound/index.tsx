import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Sources } from './sources';
import { Beats } from './beats';
import { Voices } from './voices';

// Diagrams
import { beat } from './diagrams/beat';
import { sound } from './diagrams/sound';

const Sound: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const specs = useMemo(() => ({ beat: beat(t), sound: sound(t) }), [t]);

  return (
    <Details heading='h3' summary={t('article.sound.title')}>
      <Text is='p'>{t('article.sound.voices')}</Text>
      <Voices />
      <Text is='p'>{t('article.sound.drums')}</Text>
      <Beats />
      <Text is='p'>{t('article.sound.arrange')}</Text>
      <Diagram spec={specs.sound} />
      <Text is='p'>{t('article.sound.once')}</Text>
      <Text is='p'>{t('article.sound.beat')}</Text>
      <Sources />
      <Diagram spec={specs.beat} />
      <Text is='p'>{t('article.sound.answers')}</Text>
    </Details>
  );
};

export { Sound };
