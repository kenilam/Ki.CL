import React from 'react';

// Components
import { Button, Card, Heading, HyperLink, Layout, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Constants
import { ROOT_NODE_ID } from '@/Views/Experiments/TreeOfLife/constants';
import {
  VERSIONS,
  toVersionPath,
} from '@/Views/Experiments/TreeOfLife/Versions/constants';

/**
 * The hero.
 *
 * `banner` is the landmark role a page-level header carries on its own, so the
 * element does the announcing rather than an attribute — and the heading inside
 * it is the page's `h1`, which is what a screen reader reaches for first.
 *
 * The gradient behind it is the same green the tree grows from, drifting slowly
 * enough to read as light rather than as motion. It is one element and one
 * keyframe: a large background panned across, which the compositor handles
 * without touching layout.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--landing';
const POPOVER_ID = `${CLASS_NAME}--versions`;

const Banner: React.FunctionComponent = () => {
  return (
    <Layout
      autoFlow='row'
      gap='narrow'
      justifyItems='start'
      fullScreen
      frames='auto--max-content--auto'
    >
      <header className={`${CLASS_NAME}__banner`}>
        <Heading is='h1' className={'kicl-font-size-huge'}>
          Tree of Life
        </Heading>

        <Text is='p' lookLike='h3'>
          Two point three million species, one continuous walk. Start at the
          origin of life and travel to anything alive — with a plate drawn for
          every organism along the way.
        </Text>

        <Layout alignItems='center' autoFlow='column' gap='narrow'>
          <nav className={`${CLASS_NAME}__actions`}>
            <HyperLink
              lookLikeButton
              to={toVersionPath({ nodeId: ROOT_NODE_ID })}
              size='small'
              variant='secondary'
            >
              See the final version
            </HyperLink>

            {/*
              The list opens through the popover attributes, so it needs no
              state and comes with the top layer, Escape and click-outside
              dismissal already handled.
            */}
            <Button
              unstyled
              type='button'
              alignItems='center'
              popoverTarget={POPOVER_ID}
              className={`${CLASS_NAME}__versions-toggle`}
              aria-label='Every version of this view'
              title='Every version of this view'
            >
              <Ri.RiStackLine aria-hidden />
            </Button>
          </nav>
        </Layout>

        <div
          id={POPOVER_ID}
          popover='auto'
          className={`${CLASS_NAME}__versions`}
        >
          <Card>
            <nav>
              {[...VERSIONS].reverse().map((version) => (
                <HyperLink
                  unstyled
                  key={version}
                  to={toVersionPath({ version, nodeId: ROOT_NODE_ID })}
                >
                  {version}
                </HyperLink>
              ))}
            </nav>
          </Card>
        </div>
      </header>
    </Layout>
  );
};

export default Banner;
