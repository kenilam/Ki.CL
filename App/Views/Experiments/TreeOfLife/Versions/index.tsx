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
import { VERSIONS, toVersionPath, type Version } from './constants';

// Routes
export { routes } from './routes';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--versions';

/** What the current path is showing — the live view unless it names a version. */
const LIVE = 'final';

const Versions: React.FunctionComponent = () => {
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
        <div>
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
            <Text is='span' dense unstyled className='kicl-font-size-small'>
              {version}
            </Text>
            <Text is='span' dense unstyled className='kicl-font-size-small'>
              version
            </Text>
          </Button>
        </div>
      </Layout>

      <dialog
        className={`${CLASS_NAME} kicl-inset-block-end-narrow`}
        id={CLASS_NAME}
        popover='auto'
      >
        <Card>
          <Layout
            autoFlow='row'
            justifyContent='stretch'
            justifyItems='center'
            gap='narrower'
          >
            <nav>
              <HyperLink unstyled to={toVersionPath({ nodeId })}>
                Final
              </HyperLink>
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

export default Versions;
