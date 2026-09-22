import React from 'react';
import { Button } from '@/components';
import { Ri } from '@/icons';

import './styles.scss';

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
