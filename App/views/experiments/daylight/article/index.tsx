import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Context
import { useDaylightContext } from '@/views/experiments/daylight/context';

// Partials
import { Globe } from './globe';
import { Places } from './places';
import { Words } from './words';

// Constants
import { CLASS_NAME } from '@/views/experiments/daylight/constants';

const Article: React.FunctionComponent = () => {
  const { article } = useDaylightContext();

  return (
    <Layout autoFlow='row' gap='none'>
      {/* The frame clips the drawing to the page. */}
      <Frame grow>
        {/* The words, then the places under them, at the top. */}
        <Layout alignContent='start' autoFlow='row' gap='narrow'>
          <article
            className={classNames(CLASS_NAME, 'kicl-position-relative')}
            ref={article}
          >
            <Globe />
            <Words />
            <Places />
          </article>
        </Layout>
      </Frame>
    </Layout>
  );
};

export { Article };
