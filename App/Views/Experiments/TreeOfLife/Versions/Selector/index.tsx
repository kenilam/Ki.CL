import React from 'react';

// Components
import { Button, Card, HyperLink, Layout, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Routes
import { useLocation } from '@/Router';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Constants
import {
  VERSIONS,
  toVersionPath,
  type Version,
} from '@/Views/Experiments/TreeOfLife/Versions/constants';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--versions--selector';

/** What the current path is showing — the live view unless it names a version. */
const LIVE = 'final';

const Selector: React.FunctionComponent = () => {
  const { focus: nodeId } = useTreeOfLifeContext();
  const { pathname } = useLocation();

  /*
   * Read from the path rather than from `useParams`. Each version is a literal
   * segment in its own route, not a `:version` placeholder, so there is no
   * parameter to ask for — the segment is the name.
   */
  const version =
    pathname
      .split('/')
      .find((segment): segment is Version =>
        (VERSIONS as readonly string[]).includes(segment)
      ) ?? LIVE;

  return (
    <>
      <Layout
        className='kicl-position-fixed kicl-inset-block-end kicl-inset-inline-end'
        alignItems='center'
        autoFlow='column'
        justifyContent='end'
        gap='narrower'
      >
        {/*
          One element, because `Layout` clones its only child rather than
          wrapping it — handed two, it throws and takes the view down with it.
        */}
        <nav>
          <Button
            unstyled
            type='button'
            alignItems='center'
            gap='narrower'
            className={`${CLASS_NAME}__toggle`}
            popoverTarget={CLASS_NAME}
            aria-label='Earlier versions of this view'
            title='Show the earlier versions of this view'
          >
            <Ri.RiStackLine aria-hidden />
            {/*
              One string, not a number beside a word. Split across two spans it
              read "14 version", which scans as a count of versions rather than
              as the name of this one — and the two orders do not agree, since
              the unversioned fallback reads "final version" and never
              "version final".
            */}
            <Text is='span' dense unstyled className='kicl-font-size-small'>
              {version === LIVE ? 'Final version' : `Version ${version}`}
            </Text>
          </Button>
        </nav>
      </Layout>

      <dialog
        className={`${CLASS_NAME} kicl-inset-block-end-narrow`}
        id={CLASS_NAME}
        popover='auto'
      >
        <Card variant='ghost'>
          <Layout
            autoFlow='row'
            justifyContent='stretch'
            justifyItems='center'
            gap='narrower'
          >
            {/*
              Every entry names a version, the current one included. The
              separate "Final" link pointed at an unversioned node path, which
              no longer exists — and said nothing the list does not.
            */}
            <nav>
              {[...VERSIONS].reverse().map((version) => (
                <HyperLink
                  unstyled
                  key={version}
                  to={toVersionPath({ version, nodeId })}
                >
                  {version}
                </HyperLink>
              ))}
            </nav>
          </Layout>
        </Card>
      </dialog>
    </>
  );
};

export default Selector;
