import React from 'react';

// Components
import { Heading, Layout, Separator, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Actions } from './actions';
import { Contact } from './contact';

// Constants
import { CLASS_NAME as RESUME } from '@/views/resume/constants';

const CLASS_NAME = `${RESUME}__header`;

/** Who this is and how to reach them. The name is the page's only `h1`. */
const Header: React.FunctionComponent = () => {
  const { headline } = useVersion();

  const { t } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header className={CLASS_NAME}>
        <Separator className='kicl-inline-size-xs' variant='gradient' />
        <Heading className='kicl-font-size-larger' dense is='h1'>
          {t('name')}
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
