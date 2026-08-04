import React from 'react';

// Components
import { Badge, Button, HyperLink, Layout, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Constants
import {
  ARCHIVE,
  toArchivePath,
} from '@/Views/Experiments/TreeOfLife/constants';

/**
 * The earlier versions, reachable from the current one.
 *
 * Each was a whole attempt at drawing the same tree rather than a revision of
 * the one before, so the archive is worth opening: the interesting part is how
 * differently the same data reads. Every link keeps the taxon you are on —
 * landing on the origin each time would make them hard to compare.
 *
 * Opening and closing is the browser's own, through the popover attributes: no
 * state, no handler, no effect. That buys the top layer, dismissal on Escape
 * and on a click outside, and focus handling, none of which would come free
 * from a class toggled in React.
 *
 * A `:focus`-driven sibling selector would also have avoided the state, but not
 * survived use: focus leaves the button the moment a link inside is reached, so
 * the panel would close before the click landed.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';
const POPOVER_ID = `${CLASS_NAME}--archive`;

const Archive: React.FunctionComponent = () => {
  const { focus } = useTreeOfLifeContext();

  return (
    <>
      <Layout
        className={`${CLASS_NAME}__chrome kicl-position-fixed kicl-inset-block-end-narrow kicl-inset-inline-end-narrow`}
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
          className={`${CLASS_NAME}__archive-toggle kicl-color-grey-dark`}
          popoverTarget={POPOVER_ID}
          aria-label='Earlier versions of this view'
          title='Show the earlier versions of this view'
        >
          <Ri.RiStackLine aria-hidden />
          <Text is='span' dense unstyled className='kicl-font-size-small'>
            archive
          </Text>
        </Button>
      </Layout>

      {/*
        `popover` rather than a rendered-or-not panel: the element is always in
        the document and the browser decides whether it is shown, which is what
        makes the whole control work without a line of script.
      */}
      <dialog
        id={POPOVER_ID}
        popover='auto'
        className={`${CLASS_NAME}__archive`}
      >
        <Text
          dense
          is='p'
          className={`kicl-font-size-smaller ${CLASS_NAME}__muted`}
        >
          Earlier versions — the same tree, drawn differently.
        </Text>

        <ul className={`${CLASS_NAME}__archive-list`}>
          {ARCHIVE.map((version) => (
            <li key={version} className={`${CLASS_NAME}__archive-item`}>
              <HyperLink unstyled to={toArchivePath(version, focus)}>
                <Badge is='span' variant='ghost'>
                  {version}
                </Badge>
              </HyperLink>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
};

export default Archive;
