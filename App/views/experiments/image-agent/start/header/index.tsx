import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/components';

// Constants
import { DESCRIPTION } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME as START } from '@/views/experiments/image-agent/start/constants';

const CLASS_NAME = `${START}__header`;

const COPY = {
  title: 'Image Agent',
};

/** The start page's title and a line about it. */
const Header: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='wide' justifyItems='start'>
    <header className={CLASS_NAME}>
      <Heading
        is='h1'
        dense
        className={classNames('kicl-color-white', 'kicl-font-size-huge')}
      >
        {COPY.title}
      </Heading>
      <Text is='p' className='kicl-font-size-medium'>
        {DESCRIPTION}
      </Text>
    </header>
  </Layout>
);

export { Header };
