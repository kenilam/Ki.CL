import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Button, HyperLink, Layout } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Routes
import { useLocation } from 'design/router';

// Styles
import './styles.scss';

// Constants
import {
  VERSIONS,
  type Version,
} from '@/views/experiments/tree-of-life/versions/constants';
import { CLASS_NAME } from '@/views/experiments/tree-of-life/versions/selector/constants';

const Toggle: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { t: common } = useTranslation();
  const { pathname } = useLocation();

  /*
   * Read from the path rather than from `useParams`. Each version is a literal
   * segment in its own route, not a `:version` placeholder, so there is no
   * parameter to ask for - the segment is the name.
   * The live view names no version, and reads as the final one.
   */
  const version = pathname
    .split('/')
    .find((segment): segment is Version =>
      (VERSIONS as readonly string[]).includes(segment)
    );

  return (
    <Layout
      className={classNames(
        'kicl-position-fixed',
        'kicl-inset-block-end',
        'kicl-inset-inline-end'
      )}
      alignItems='center'
      autoFlow='column'
      justifyContent='end'
      gap='narrow'
    >
      <nav aria-label={common('experiment', { context: 'tree_of_life' })}>
        <HyperLink
          before={<Ri.RiArrowLeftSLine aria-hidden />}
          className='kicl-font-size-small'
          to='..'
          unstyled
        >
          {common('action', { context: 'back' })}
        </HyperLink>
        <Button
          unstyled
          type='button'
          alignItems='center'
          before={<Ri.RiStackLine aria-hidden />}
          gap='narrower'
          className={classNames(
            `${CLASS_NAME}__toggle`,
            'kicl-font-size-small',
            'kicl-z-index-popover'
          )}
          popoverTarget={CLASS_NAME}
          title={t('hint', { context: 'versions' })}
        >
          {t('version', { context: version ? undefined : 'final', version })}
        </Button>
      </nav>
    </Layout>
  );
};

export { Toggle };
