import React from 'react';

import classNames from 'classnames';

import { Animated, Layout, List, Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

import { Language } from './language';

import './styles.scss';

import { LANGUAGES } from './constants';

const Languages: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { languages } = useVersion();
  const { ref, seen } = useSeen<HTMLElement>();

  return (
    <>
      <Layout autoFlow='row' gap='normal'>
        <div
          className={classNames(
            'kicl-max-inline-size-columns-8',
            'kicl-print-hidden',
            'kicl-scroll-enter-near'
          )}
        >
          <List>
            {LANGUAGES.map(({ lang }) => {
              return <Language key={lang} lang={lang} />;
            })}
          </List>
          <Animated.Text
            className='kicl-font-family-mono'
            delay={150 + LANGUAGES.length * 120}
            dense
            duration='slow'
            easing='ease-expo-out'
            hold
            in={seen}
            lookLike='small'
            property='fade'
            ref={ref}
            stagger={12}
            variant='secondary'
          >
            {t('proficiency')}
          </Animated.Text>
        </div>
      </Layout>
      <Text className='kicl-print-only' dense>
        {languages}
      </Text>
    </>
  );
};

export { Languages };
