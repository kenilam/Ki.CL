import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  CLASS_NAME as VIEW,
  PATH,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__words`;

/** The page's header: the way back, the title and a line about it. */
const Words: React.FunctionComponent = () => {
  const { t } = useTranslation('daylight');
  const { t: common } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header className={CLASS_NAME}>
        <HyperLink
          before={<Ri.RiArrowLeftSFill aria-hidden />}
          to={toExperimentsPath(PATH)}
        >
          {common('experiments')}
        </HyperLink>
        <Heading className='kicl-font-size-larger' dense is='h1'>
          {common('experiment', { context: 'daylight' })}
        </Heading>
        <Text dense is='p'>
          {t('lede')}
        </Text>
      </header>
    </Layout>
  );
};

export { Words };
