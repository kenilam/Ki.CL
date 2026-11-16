import React from 'react';

import { Menu } from '@/views/about/menu';
import { Stage } from '@/views/about/stage';
import { Footer } from '@/views/footer';
import { Top } from '@/views/top';

import { MASTER } from '@/views/about/resume/content';
import { useVersion } from '@/views/about/resume/context';
import { usePrintTitle } from '@/views/about/resume/use-print-title';

import { Article } from './article';
import { Entry } from './entry';

const Page: React.FunctionComponent = () => {
  const version = useVersion();

  usePrintTitle();

  return (
    <>
      {version.slug !== MASTER.slug ? (
        <meta content='noindex' name='robots' />
      ) : null}
      <Entry />
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
