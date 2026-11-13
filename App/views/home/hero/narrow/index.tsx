import React from 'react';

import { Byline } from '@/views/home/hero/byline';
import { Mark } from '@/views/home/hero/mark';
import { Tagline } from '@/views/home/hero/tagline';
import { Title } from '@/views/home/hero/title';
import { Works } from '@/views/home/hero/works';

const Narrow: React.FunctionComponent = () => {
  return (
    <>
      <Title />
      <Mark />
      <Byline />
      <Works />
      <aside className='kicl-padding-block-start-extreme'>
        <Tagline />
      </aside>
    </>
  );
};

export { Narrow };
