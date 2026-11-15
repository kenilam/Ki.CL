import React from 'react';

import classNames from 'classnames';

import { Byline } from '@/views/home/hero/byline';
import { Hint } from '@/views/home/hero/hint';
import { Mark } from '@/views/home/hero/mark';
import { Tagline } from '@/views/home/hero/tagline';
import { Title } from '@/views/home/hero/title';
import { Works } from '@/views/home/hero/works';

const Narrow: React.FunctionComponent = () => {
  return (
    <>
      <Title />
      <div
        className={classNames('kicl-position-relative', 'kicl-scroll-leave')}
      >
        <Mark />
        <Byline />
        <Hint />
      </div>
      <Works />
      <aside className='kicl-padding-block-start-extreme'>
        <Tagline />
      </aside>
    </>
  );
};

export { Narrow };
