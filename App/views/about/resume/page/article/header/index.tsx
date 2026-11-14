import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Separator, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useVersion } from '@/views/about/resume/context';

// Partials
import { Actions } from './actions';
import { Contact } from './contact';

// Constants
import { CLASS_NAME as RESUME } from '@/views/about/resume/constants';

const CLASS_NAME = `${RESUME}__header`;

/** Who this is and how to reach them. The name is the page's only `h1`. */
const Header: React.FunctionComponent = () => {
  const { headline } = useVersion();

  const { t } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header
        className={classNames(CLASS_NAME, 'kicl-print-break-after-avoid')}
      >
        <Separator className='kicl-inline-size-xs' variant='gradient' />
        <Heading className='kicl-font-size-larger' dense is='h1'>
          {t('name')}
        </Heading>
        <Actions />
        <Text
          className={classNames(
            'kicl-font-size-medium',
            'kicl-print-break-inside-avoid'
          )}
          dense
        >
          {headline}
        </Text>
        <Contact />
      </header>
    </Layout>
  );
};

export { CLASS_NAME, Header };
