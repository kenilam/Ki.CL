import React from 'react';

import {
  Animated,
  Animation,
  Badge,
  Button,
  Layout,
  ListItem,
} from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/use-seen';

import './styles.scss';

import { CLASS_NAME as SECTION } from '@/views/resume/page/article/sections/section/constants';
import {
  ALL_ID,
  LATEST,
  RECOGNITIONS,
} from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/constants';

const DELAY = 350;

const STEP = 60;

const More: React.FunctionComponent = () => {
  const { i18n, t } = useTranslation('resume');
  const { ref, seen } = useSeen<HTMLLIElement>();

  const count = RECOGNITIONS.length - LATEST;

  return (
    <Animation
      delay={DELAY + LATEST * STEP}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <ListItem ref={ref}>
        <Layout autoFlow='row' gap='narrower' justifyItems='center'>
          <label>
            <Button
              aria-label={t('action', { context: 'recognitions' })}
              className={`${SECTION}__recognitions__more`}
              command='show-modal'
              commandfor={ALL_ID}
              data-track='Resume recognitions'
              justifyContent='center'
              variant='ghost'
            >
              <Animated.Text
                delay={DELAY + LATEST * STEP}
                dense
                in={seen}
                is='span'
                lookLike='h2'
                property='scramble'
              >
                {new Intl.NumberFormat(i18n.language, {
                  signDisplay: 'always',
                }).format(count)}
              </Animated.Text>
            </Button>
            <Animated.Text
              delay={DELAY + LATEST * STEP}
              dense
              in={seen}
              lookLike='strong'
              property='slide-from-bottom'
              split='letter'
            >
              {t('more', { count })}
            </Animated.Text>
            <Badge variant='ghost'>{t('action', { context: 'all' })}</Badge>
          </label>
        </Layout>
      </ListItem>
    </Animation>
  );
};

export { More };
