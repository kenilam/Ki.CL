import React from 'react';

import classNames from 'classnames';

import { Dialog, List } from 'design/components';

import { Entry } from './entry';
import { Title } from './title';

import './styles.scss';

import { CLASS_NAME as SECTION } from '@/views/resume/page/article/sections/section/constants';
import {
  ALL_ID,
  RECOGNITIONS,
} from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/constants';

const All: React.FunctionComponent = () => {
  return (
    <Dialog
      className={classNames(
        `${SECTION}__recognitions__all`,
        'kicl-print-hidden'
      )}
      header={<Title />}
      id={ALL_ID}
      size={5}
    >
      <List autoFlow='row' gap='normal' separated>
        {RECOGNITIONS.map(({ certificate }) => {
          return <Entry certificate={certificate} key={certificate} />;
        })}
      </List>
    </Dialog>
  );
};

export { All };
