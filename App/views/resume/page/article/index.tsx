import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card } from 'design/components';

// Content
import { fingerprint } from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Header } from './header';
import { Sections } from './sections';

// Styles
import './styles.scss';
import './styles.print.scss';

// Constants
import { CLASS_NAME } from '@/views/resume/constants';

const Article: React.FunctionComponent = () => {
  const version = useVersion();

  return (
    <Card
      className={classNames(CLASS_NAME, 'kicl-margin-inline-auto')}
      // The export checks this against the files, to know the database is not behind them.
      data-fingerprint={fingerprint(version)}
      data-version={version.slug}
      gap='wide'
      is='article'
      size={12}
      variant='secondary'
    >
      <Header />
      <Sections />
    </Card>
  );
};

export { Article };
