import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Constants
import {
  COPY as EXPERIMENTS_COPY,
  toPath as toExperimentsPath,
} from '@/views/experiments/constants';
import { DESCRIPTION, PATH } from '@/views/experiments/image-agent/constants';

const COPY = {
  title: 'Image Agent',
};

/** The start page's title and a line about it. */
const Header: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrower' justifyItems='start'>
    <header className='kicl-inline-size-columns-6'>
      <HyperLink
        before={<Ri.RiArrowLeftSFill aria-hidden />}
        to={toExperimentsPath(PATH)}
      >
        {EXPERIMENTS_COPY.back}
      </HyperLink>
      <Heading is='h1' dense className='kicl-font-size-huge'>
        {COPY.title}
      </Heading>
      <Text
        dense
        is='p'
        className={classNames(
          'kicl-font-size-medium',
        )}
      >
        {DESCRIPTION}
      </Text>
    </header>
  </Layout>
);

export { Header };
