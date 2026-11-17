import React from 'react';

import classNames from 'classnames';

import { List } from 'design/components';

import { All } from './all';
import { More } from './more';
import { Recognition } from './recognition';

import './styles.scss';

import { CLASS_NAME as SECTION } from '@/views/resume/page/article/sections/section/constants';
import { LATEST, RECOGNITIONS } from './constants';

const Recognitions: React.FunctionComponent = () => {
  return (
    <>
      <List
        alignItems='start'
        className={classNames(`${SECTION}__recognitions`, 'kicl-print-hidden')}
        display='flex'
        gap='wide'
        wrap
      >
        {RECOGNITIONS.slice(0, LATEST).map(({ certificate }) => {
          return <Recognition certificate={certificate} key={certificate} />;
        })}
        <More />
      </List>
      <All />
    </>
  );
};

export { Recognitions };
