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
import { beat } from './diagrams/beat';
import { sound } from './diagrams/sound';

const VOICES = ['grand', 'upright', 'sixteen', 'wurlitzer', 'synth'] as const;

const BEATS = [
  'none',
  'kit',
  'lofi',
  'percussion',
  'linndrum',
  'machine',
] as const;

const SOURCES = ['midi', 'arranged', 'other'] as const;

const Sound: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const specs = useMemo(() => ({ beat: beat(t), sound: sound(t) }), [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.sound.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.sound.voices')}</Text>
      <List gap='narrow' listStyleType='disc'>
        {VOICES.map((context) => (
          <ListItem autoFlow='row' gap='none' key={context}>
            <Heading dense is='h4'>
              {t('voice', { context })}
            </Heading>
            <Text is='p'>
              <Markdown>{t('article.sound.voice', { context })}</Markdown>
            </Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.sound.drums')}</Text>
      <List gap='narrow' listStyleType='disc'>
        {BEATS.map((context) => (
          <ListItem autoFlow='row' gap='none' key={context}>
            <Heading dense is='h4'>
              {t('beat', { context })}
            </Heading>
            <Text is='p'>{t('article.sound.drum', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.sound.arrange')}</Text>
      <Diagram spec={specs.sound} />
      <Text is='p'>{t('article.sound.once')}</Text>
      <Text is='p'>{t('article.sound.beat')}</Text>
      <List gap='narrow' listStyleType='disc'>
        {SOURCES.map((context) => (
          <ListItem autoFlow='row' gap='none' key={context}>
            <Heading dense is='h4'>
              {t('article.sound.when', { context })}
            </Heading>
            <Text is='p'>{t('article.sound.drums', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Diagram spec={specs.beat} />
      <Text is='p'>{t('article.sound.answers')}</Text>
    </Details>
  );
};

export { Sound };
