import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import {
  Button,
  Input,
  Layout,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from 'design/components';

// Context
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';
import { settingsOf } from '@/views/experiments/kinetic-light/song/settings';
import type { Settings as Values } from '@/views/experiments/kinetic-light/stage/settings';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__settings`;

const RANGES: Record<keyof Values, { max: number; min: number; step: number }> =
  {
    glow: { max: 3, min: 0, step: 0.1 },
    hue: { max: 1, min: 0, step: 0.01 },
    speed: { max: 20, min: 3, step: 0.5 },
  };

const KEYS = ['speed', 'hue', 'glow'] as const;

const Settings: React.FunctionComponent = () => {
  const { save, song } = usePlayerContext();
  const values = settingsOf(song?.arrangement);
  const { t } = useTranslation('kinetic-light');
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={t('label', { context: 'settings' })}
          size='small'
          variant='secondary'
        >
          <Ri.RiEqualizerLine aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent placement='block-start-start'>
        <Layout autoFlow='row' gap='narrow'>
          <section className={CLASS_NAME}>
            {KEYS.map((key) => (
              <Layout autoFlow='row' gap='none' key={key}>
                <label>
                  <Text is='span' dense>
                    {t('label', { context: key })}
                  </Text>
                  <Input
                    className={classNames(
                      `${CLASS_NAME}__slider`,
                      'kicl-padding-none'
                    )}
                    defaultValue={values[key]}
                    max={RANGES[key].max}
                    min={RANGES[key].min}
                    onChange={(event) => save(key, Number(event.target.value))}
                    step={RANGES[key].step}
                    type='range'
                  />
                </label>
              </Layout>
            ))}
          </section>
        </Layout>
      </PopoverContent>
    </Popover>
  );
};

export { Settings };
