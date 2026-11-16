import React from 'react';

import classNames from 'classnames';

import { fingerprint } from '@/views/about/resume/content';
import { useVersion } from '@/views/about/resume/context';

import { Intro } from './intro';
import { Sections } from './sections';
import { Timeline } from './timeline';

import './styles.print.scss';

import { CLASS_NAME } from '@/views/about/resume/constants';

const Article: React.FunctionComponent = () => {
  const version = useVersion();

  return (
    <article
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-position-relative'
      )}
      data-fingerprint={fingerprint(version)}
      data-version={version.slug}
    >
      <Intro />
      <Timeline />
      <Sections />
    </article>
  );
};

export { Article };
