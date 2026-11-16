import React from 'react';

import classNames from 'classnames';

import { Dialog, List } from 'design/components';

import { Download } from './download';
import { Print } from './print';
import { Title } from './title';
import { View } from './view';

import './styles.scss';

import { CLASS_NAME, ENTRY_ID } from '@/views/about/resume/constants';

const Entry: React.FunctionComponent = () => {
  return (
    <Dialog
      className={classNames(`${CLASS_NAME}__entry`, 'kicl-print-hidden')}
      header={<Title />}
      id={ENTRY_ID}
      open
      size={4}
    >
      <List autoFlow='row' gap='narrow' justifyItems='stretch'>
        <Print />
        <Download />
        <View />
      </List>
    </Dialog>
  );
};

export { Entry };
