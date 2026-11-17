import React, { Suspense } from 'react';

import classNames from 'classnames';

import { Dialog as Origin, List, Spinner } from 'design/components';

import { useDialog } from '@/views/use-dialog';

import { Download } from './download';
import { Title } from './title';
import { View } from './view';

import './styles.scss';

import { CLASS_NAME, ENTRY_ID } from '@/views/resume/constants';

const Dialog: React.FunctionComponent = () => {
  const node = useDialog();

  return (
    <Origin
      className={classNames(`${CLASS_NAME}__entry`, 'kicl-print-hidden')}
      header={<Title />}
      id={ENTRY_ID}
      ref={node}
      size={4}
    >
      <Suspense fallback={<Spinner position='inline' />}>
        <List autoFlow='row' gap='narrow' justifyItems='stretch'>
          <Download />
          <View />
        </List>
      </Suspense>
    </Origin>
  );
};

export { Dialog };
