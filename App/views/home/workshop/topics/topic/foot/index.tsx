import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';
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
      <span
        aria-hidden
        className={classNames(
          CLASS_NAME,
          'kicl-font-size-moderate',
          'kicl-font-weight-bold',
          'kicl-letter-spacing-tight'
        )}
      >
        {t(topic.context)}
        <Icon />
      </span>
    </Layout>
  );
};

export { Foot };
