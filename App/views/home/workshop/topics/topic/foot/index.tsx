import React from 'react';

import classNames from 'classnames';

import { Layout, Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import { TOPICS } from '@/views/routes';

import type { Props } from '@/views/home/workshop/topics/topic';

import './styles.scss';

import { CLASS_NAME as TOPIC } from '@/views/home/workshop/topics/topic/constants';

const CLASS_NAME = `${TOPIC}__foot`;

const Foot: React.FunctionComponent<Props> = ({ to }) => {
  const { t } = useTranslation();
  const topic = TOPICS.find((each) => {
    return each.to === to;
  });

  if (!topic) {
    return null;
  }

  const [Icon] = topic.icons;

  return (
    <Layout
      alignItems='start'
      autoFlow='column'
      frames='auto--max-content'
      gap='normal'
    >
      <Text
        aria-hidden
        className={classNames(CLASS_NAME, 'kicl-letter-spacing-tight')}
        is='span'
        lookLike='h3'
      >
        {t(topic.context)}
        <Icon />
      </Text>
    </Layout>
  );
};

export { Foot };
