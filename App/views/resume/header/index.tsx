import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Separator, Text } from 'design/components';

// Content
import { NAME } from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Actions } from '@/views/resume/actions';
import { Contact } from './contact';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as RESUME } from '@/views/resume/constants';

const CLASS_NAME = `${RESUME}__header`;

/** Who this is and how to reach them. The name is the page's only `h1`. */
const Header: React.FunctionComponent = () => {
  const { headline } = useVersion();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header className={CLASS_NAME}>
        <Separator className={`${CLASS_NAME}__rule`} />
        <Heading
          className={classNames(
            'kicl-font-size-larger',
            'kicl-line-height-narrow'
          )}
          dense
          is='h1'
        >
          {NAME}
        </Heading>
        <Actions />
        <Text className='kicl-font-size-medium' dense>
          {headline}
        </Text>
        <Contact />
      </header>
    </Layout>
  );
};

export { CLASS_NAME, Header };
