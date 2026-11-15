import React from 'react';

import classNames from 'classnames';

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

  return (
    <Glyph
      className={classNames(
        CLASS_NAME,
        'kicl-ease-back-out',
        'kicl-transition-duration-slow'
      )}
    />
  );
};

export { Icon };
