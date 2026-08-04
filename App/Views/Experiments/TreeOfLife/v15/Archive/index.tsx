import React from 'react';

// Components
import {
  Badge,
  Button,
  Card,
  Heading,
  HyperLink,
  Layout,
  Text,
} from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Constants
import {
  ARCHIVE,
  toArchivePath,
} from '@/Views/Experiments/TreeOfLife/constants';

// Styles
import './Styles.scss';

/**
 * The earlier versions, reachable from the current one.
 *
 * Each was a whole attempt at drawing the same tree rather than a revision of
 * the one before, so the archive is worth opening: the interesting part is how
 * differently the same data reads. Every link keeps the taxon you are on —
 * landing on the origin each time would make them hard to compare.
 *
 * Opening and closing is the browser's, through the popover attributes. No
 * state, no handler, no effect, and the top layer, Escape, dismissal on a
 * click outside and focus handling all come with it.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15--archive';

const Archive: React.FunctionComponent = () => {
  const { focus } = useTreeOfLifeContext();

  return (
    <>
      <Layout
        className='kicl-position-fixed kicl-inset-block-end kicl-inset-inline-end'
        alignItems='center'
        autoFlow='column'
        justifyContent='end'
        gap='narrower'
      >
        <Button
          unstyled
          type='button'
          alignItems='center'
          gap='narrower'
          className={`${CLASS_NAME}__toggle kicl-color-grey-dark`}
          popoverTarget={CLASS_NAME}
          aria-label='Earlier versions of this view'
          title='Show the earlier versions of this view'
        >
          <Ri.RiStackLine aria-hidden />
          <Text is='span' dense unstyled className='kicl-font-size-small'>
            archive
          </Text>
        </Button>
      </Layout>

      <dialog className={CLASS_NAME} id={CLASS_NAME} popover='auto'>
        <Card>
          <Heading dense is='h3' className='kicl-font-size-small'>
            Earlier versions — the same tree, drawn differently.
          </Heading>

          <ul>
            {ARCHIVE.map((version) => (
              <li key={version}>
                <HyperLink unstyled to={toArchivePath(version, focus)}>
                  <Badge is='span' variant='ghost'>
                    {version}
                  </Badge>
                </HyperLink>
              </li>
            ))}
          </ul>
        </Card>
      </dialog>
    </>
  );
};

export default Archive;
