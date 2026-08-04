import React, { useState } from 'react';

// Components
import {
  Animation,
  Badge,
  Button,
  Card,
  CardContent,
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

/**
 * The earlier versions, reachable from the current one.
 *
 * Each was a whole attempt at drawing the same tree rather than a revision of
 * the one before, so the archive is worth opening: the interesting part is how
 * differently the same data reads.
 *
 * The panel keeps the taxon you are on. Landing on the origin every time would
 * make the versions hard to compare — the point is to see *this* clade drawn
 * another way.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

const Archive: React.FunctionComponent = () => {
  const { focus } = useTreeOfLifeContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/*
        Above the panel in the source so it keeps its place in the tab order
        once the panel opens: the control that opened it should not end up
        behind what it revealed.
      */}
      <Layout
        className={`${CLASS_NAME}__chrome kicl-position-fixed kicl-inset-block-end-narrow kicl-inset-inline-end-narrow`}
        alignItems='center'
        autoFlow='column'
        justifyContent='end'
        gap='narrower'
      >
        <div>
          <Button
            unstyled
            type='button'
            alignItems='center'
            gap='narrower'
            className={open ? 'kicl-color-green' : 'kicl-color-grey-dark'}
            aria-expanded={open}
            aria-label='Earlier versions of this view'
            title={
              open
                ? 'Hide the earlier versions'
                : 'Show the earlier versions of this view'
            }
            onClick={() => setOpen((current) => !current)}
          >
            <Ri.RiStackLine aria-hidden />
            <Text is='span' dense unstyled className='kicl-font-size-small'>
              archive
            </Text>
          </Button>
        </div>
      </Layout>

      <Animation animationStyle='slide-from-bottom' in={open} unmountOnExit>
        <Layout
          className={`${CLASS_NAME}__chrome ${CLASS_NAME}__archive kicl-position-fixed kicl-inset-block-end-none kicl-inset-inline-start-none`}
        >
          <Card is='aside'>
            <CardContent>
              <Layout autoFlow='row' gap='narrow'>
                <div>
                  <Text
                    dense
                    is='p'
                    className={`kicl-font-size-smaller ${CLASS_NAME}__muted`}
                  >
                    Earlier versions — same tree, drawn differently.
                  </Text>

                  <Layout
                    alignItems='center'
                    autoFlow='column'
                    gap='narrower'
                    className={`${CLASS_NAME}__archive-list`}
                  >
                    <div>
                      {ARCHIVE.map((version) => (
                        <HyperLink
                          unstyled
                          key={version}
                          to={toArchivePath(version, focus)}
                        >
                          <Badge is='span' variant='outline'>
                            {version}
                          </Badge>
                        </HyperLink>
                      ))}
                    </div>
                  </Layout>
                </div>
              </Layout>
            </CardContent>
          </Card>
        </Layout>
      </Animation>
    </>
  );
};

export default Archive;
