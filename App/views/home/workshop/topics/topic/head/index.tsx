import React from 'react';

import { CardTitle, HyperLink, Layout } from 'design/components';
import { useTranslation } from 'design/hooks';

import { TOPICS } from '@/views/routes';

import type { Props } from '@/views/home/workshop/topics/topic';

const Head: React.FunctionComponent<Props> = ({ to }) => {
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
      <CardTitle is='h3'>
        <HyperLink to={to}>{t(topic.context)}</HyperLink>
        <Icon aria-hidden />
      </CardTitle>
    </Layout>
  );
};

export { Head };
