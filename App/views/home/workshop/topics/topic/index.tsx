import React from 'react';

import classNames from 'classnames';

import { Animation, Card, HyperLink, Layout } from 'design/components';
import {
  DARK_THEME_CLASS_NAME,
  LIGHT_THEME_CLASS_NAME,
  useInView,
  useResponsive,
} from 'design/hooks';

import { TOPICS, type Topic as Data } from '@/views/routes';

import { Description } from './description';
import { Head } from './head';

import './styles.scss';

import { CLASS_NAME } from './constants';

type Props = Pick<Data, 'to'>;

const THEMES = {
  dark: DARK_THEME_CLASS_NAME,
  light: LIGHT_THEME_CLASS_NAME,
};

const Topic: React.FunctionComponent<Props> = ({ to }) => {
  const { prefersReducedMotion, theme } = useResponsive();
  const { inView, ref } = useInView<HTMLLIElement>({ once: true });

  const index = TOPICS.findIndex((each) => {
    return each.to === to;
  });

  return (
    <Layout alignContent='stretch' autoFlow='row'>
      <Animation
        delay={200 * index}
        duration='slower'
        easing='ease-expo-out'
        hold
        in={inView || prefersReducedMotion}
        nodeRef={ref}
        property='zoom-in'
      >
        <Card
          className={classNames(
            CLASS_NAME,
            THEMES[theme],
            'kicl-max-inline-size-columns-3'
          )}
          is='li'
        >
          <Layout alignContent='space-between' autoFlow='row' gap='normal'>
            <HyperLink
              className={classNames(
                `${CLASS_NAME}__link`,
                'kicl-inline-size-full',
                'kicl-padding'
              )}
              to={to}
              unstyled
            >
              <Head to={to} />
              <Description to={to} />
            </HyperLink>
          </Layout>
        </Card>
      </Animation>
    </Layout>
  );
};

export { Topic, type Props };
