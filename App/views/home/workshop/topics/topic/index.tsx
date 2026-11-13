import React from 'react';

import classNames from 'classnames';

import { Card, Layout } from 'design/components';
import {
  DARK_THEME_CLASS_NAME,
  LIGHT_THEME_CLASS_NAME,
  useResponsive,
} from 'design/hooks';

import { TOPICS, type Topic as Data } from '@/views/routes';

import { Description } from './description';
import { Foot } from './foot';
import { Head } from './head';

import './styles.scss';

import { CLASS_NAME } from './constants';

type Props = Pick<Data, 'to'>;

const THEMES = {
  dark: DARK_THEME_CLASS_NAME,
  light: LIGHT_THEME_CLASS_NAME,
};

const Topic: React.FunctionComponent<Props> = ({ to }) => {
  const { theme } = useResponsive();
  const index = TOPICS.findIndex((each) => {
    return each.to === to;
  });

  return (
    <Layout alignContent='space-between' autoFlow='row' gap='normal'>
      <Card
        className={classNames(CLASS_NAME, THEMES[theme])}
        is='li'
        style={{ '--index': index } as never}
      >
        <Head to={to} />
        <Description to={to} />
        <Foot to={to} />
      </Card>
    </Layout>
  );
};

export { Topic, type Props };
