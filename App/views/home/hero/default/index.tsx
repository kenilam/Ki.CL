import React from 'react';

import classNames from 'classnames';

import { Byline } from '@/views/home/hero/byline';
import { Mark } from '@/views/home/hero/mark';
import { Tagline } from '@/views/home/hero/tagline';
import { Title } from '@/views/home/hero/title';
import { Works } from '@/views/home/hero/works';

const Default: React.FunctionComponent = () => {
  return (
    <>
      <Title />
      <Mark />
      <Byline />
      <Works />
      <aside
        className={classNames(
          'kicl-inset-block-end-wide',
          'kicl-max-inline-size-columns-4',
          'kicl-position-sticky'
        )}
      >
        <Tagline />
      </aside>
    </>
  );
};

export { Default };
