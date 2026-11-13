import React from 'react';

import classNames from 'classnames';

import './styles.scss';

import { CLASS_NAME as WORKSHOP } from '@/views/home/workshop/constants';

const CLASS_NAME = `${WORKSHOP}__edge`;

const Edge: React.FunctionComponent = () => {
  return (
    <div
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-background-color-body',
        'kicl-inset-inline-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
    />
  );
};

export { Edge };
