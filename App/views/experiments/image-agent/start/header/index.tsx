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
import { CLASS_NAME as START } from '@/views/experiments/image-agent/start/constants';

const CLASS_NAME = `${START}__header`;

const COPY = {
  title: 'Image Agent',
};

/** The start page's title and a line about it. */
const Header: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none' justifyItems='start'>
    <header className={CLASS_NAME}>
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
        is='p'
        className={classNames(
          'kicl-font-size-medium',
          'kicl-margin-block-start-wide'
        )}
      >
        {DESCRIPTION}
      </Text>
    </header>
  </Layout>
);

export { Header };
