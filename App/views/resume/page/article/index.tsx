import React from 'react';

import classNames from 'classnames';

import { fingerprint } from '@/views/resume/content';
import { useVersion } from '@/views/resume/context';
import { useHashScroll } from '@/views/use-hash-scroll';

import { Intro } from './intro';
import { Pages } from './pages';
import { Sections } from './sections';
import { Timeline } from './timeline';

import './styles.print.scss';
import './styles.scss';

import { CLASS_NAME } from '@/views/resume/constants';

const Article: React.FunctionComponent = () => {
  const version = useVersion();

  useHashScroll();

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
      <div
        className={classNames(
          `${CLASS_NAME}__content`,
          'kicl-position-relative'
        )}
      >
        <Pages />
        <Timeline />
        <Sections />
      </div>
    </article>
  );
};

export { Article };
