import React from 'react';

import { Menu } from '@/views/menu';
import { Stage } from '@/views/stage';
import { Footer } from '@/views/footer';
import { Top } from '@/views/top';

import { MASTER } from '@/views/resume/content';
import { useVersion } from '@/views/resume/context';
import { usePrintTitle } from '@/views/resume/use-print-title';

import { Article } from './article';

const Page: React.FunctionComponent = () => {
  const version = useVersion();

  usePrintTitle();

  return (
    <>
      {version.slug !== MASTER.slug ? (
        <meta content='noindex' name='robots' />
      ) : null}
      <Stage />
      <Article />
      <Footer>
        <Menu />
        <Top />
      </Footer>
    </>
  );
};

export { Page };
