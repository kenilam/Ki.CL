import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH, SECTION } from '@/views/experiments/css-only/constants';

/** The page's header: the way back, the title and a line about it. */
const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('css-only');
  const { t: common } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header
        className={classNames(SECTION, 'kicl-padding-block-start-header')}
      >
        <HyperLink
          before={<Ri.RiArrowLeftSFill aria-hidden />}
          to={toExperimentsPath(PATH)}
        >
          {common('experiments')}
        </HyperLink>
        <Heading className='kicl-font-size-huge' dense is='h1'>
          {common('experiment', { context: 'css_only' })}
        </Heading>
        <Text className='kicl-font-size-medium' is='p'>
          {t('lede')}
        </Text>
      </header>
    </Layout>
  );
};

export { Header };
