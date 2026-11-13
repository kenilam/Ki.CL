import React from 'react';

import classNames from 'classnames';

import { TOPICS, type Topic } from '@/views/routes';

import './styles.scss';

import { CLASS_NAME as WORKSHOP } from '@/views/home/workshop/constants';

const CLASS_NAME = `${WORKSHOP}__anchor`;

type Props = Pick<Topic, 'to'>;

const Anchor: React.FunctionComponent<Props> = ({ to }) => {
  const index = TOPICS.findIndex((each) => {
    return each.to === to;
  });

  return (
    <div
      className={classNames(
        CLASS_NAME,
        'kicl-block-size-screen',
        'kicl-inset-inline-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      style={{ '--index': index } as never}
    />
  );
};

export { Anchor };
