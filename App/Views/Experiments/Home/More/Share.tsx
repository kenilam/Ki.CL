import React from 'react';
import { Button } from '@/Components';
import { Ri } from '@/Icons';

import './Styles.scss';

const COPY = {
  share: 'Share this page',
};

export const Share: React.FunctionComponent = () => {
  return (
    <Button title={COPY.share} variant='ghost'>
      <Ri.RiShareFill />
    </Button>
  )
};
