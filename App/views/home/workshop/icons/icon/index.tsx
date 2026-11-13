import React from 'react';

import { TOPICS, type Topic } from '@/views/routes';

import './styles.scss';

import { CLASS_NAME as ICONS } from '@/views/home/workshop/icons/constants';

const CLASS_NAME = `${ICONS}__icon`;

type Props = Pick<Topic, 'to'>;

const Icon: React.FunctionComponent<Props> = ({ to }) => {
  const topic = TOPICS.find((each) => {
    return each.to === to;
  });

  if (!topic) {
    return null;
  }

  const [Glyph] = topic.icons;

  return <Glyph className={CLASS_NAME} />;
};

export { Icon };
