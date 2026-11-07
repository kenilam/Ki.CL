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
import {
  settingsOf,
  usePlayerContext,
  type Settings as Values,
} from '@/views/experiments/kinetic-light/player/context';

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

export const DEFAULT: Record<keyof Values, number> = {
  glow: 0.8,
  hue: 0.5,
  speed: 3,
};

const Settings: React.FunctionComponent = () => {
  const { save, setSetting, song } = usePlayerContext();
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
                    onChange={(event) =>
                      setSetting(key, Number(event.target.value))
                    }
                    onKeyUp={(event) =>
                      save(key, Number(event.currentTarget.value))
                    }
                    onPointerUp={(event) =>
                      save(key, Number(event.currentTarget.value))
                    }
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
