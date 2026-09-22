import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, HyperLink, Layout } from '@/components';

// Icons
import { Ri } from '@/icons';

// Routes
import { useLocation } from '@/router';

// Styles
import './styles.scss';

// Constants
import {
  VERSIONS,
  type Version,
} from '@/views/experiments/tree-of-life/versions/constants';
import { CLASS_NAME } from '@/views/experiments/tree-of-life/versions/selector/constants';

/** What the current path is showing - the live view unless it names a version. */
const LIVE = 'final';

const Toggle: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  /*
   * Read from the path rather than from `useParams`. Each version is a literal
   * segment in its own route, not a `:version` placeholder, so there is no
   * parameter to ask for - the segment is the name.
   */
  const version =
    pathname
      .split('/')
      .find((segment): segment is Version =>
        (VERSIONS as readonly string[]).includes(segment)
      ) ?? LIVE;

  return (
    <Layout
      className='kicl-position-fixed kicl-inset-block-end kicl-inset-inline-end'
      alignItems='center'
      autoFlow='column'
      justifyContent='end'
      gap='narrow'
    >
      <div>
        <HyperLink
          before={<Ri.RiArrowLeftSLine aria-hidden />}
          className='kicl-font-size-small'
          to='..'
          unstyled
        >
          Back
        </HyperLink>
        <Button
          unstyled
          type='button'
          alignItems='center'
          gap='narrower'
          className={classNames(
            'kicl-font-size-small',
            `${CLASS_NAME}__toggle`
          )}
          popoverTarget={CLASS_NAME}
          title='Every version of this view'
        >
          <Ri.RiStackLine aria-hidden />
          {version === LIVE ? 'Final version' : `Version ${version}`}
        </Button>
      </div>
    </Layout>
  );
};

export { Toggle };
