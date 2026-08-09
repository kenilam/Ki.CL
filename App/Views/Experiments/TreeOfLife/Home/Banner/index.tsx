import React from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Partials
import Attempts from '../Attempts';

// Styles
import './Styles.scss';

// Constants
import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';
import { VERSION } from '@/Views/Experiments/TreeOfLife/Versions/v15/constants';

/**
 * The hero.
 *
 * `banner` is the landmark role a page-level header carries on its own, so the
 * element does the announcing rather than an attribute — and the heading inside
 * it is the page's `h1`, which is what a screen reader reaches for first.
 *
 * Two columns: what this is on one side, what it took on the other. The screen
 * was previously four fifths empty ground, which said nothing about a project
 * whose whole claim is fifteen attempts at the same picture — so the index of
 * those attempts is the thing that fills it.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__banner';

const Banner: React.FunctionComponent = () => {
  return (
    <Layout
      alignItems='center'
      alignContent='center'
      autoFlow='row'
      justifyItems='start'
    >
      <header className={CLASS_NAME}>
        {/*
          The spread is its own element rather than the header itself: `Layout`
          clones its utility classes onto the child it wraps, and those are
          written double so they outrank a single view class — a column
          template set on the header is simply lost.
        */}
        <div className={`${CLASS_NAME}__spread`}>
          <div className={`${CLASS_NAME}__lede`}>
            <Heading
              is='h1'
              dense
              className={`${CLASS_NAME}__title kicl-font-size-huge`}
            >
              Tree of Life
            </Heading>

            <Text is='p' className='kicl-font-size-medium'>
              Two point three million species, one continuous walk. Start at the
              origin of life and travel to anything alive — with a plate drawn
              for every organism along the way.
            </Text>

            <nav className={`${CLASS_NAME}__actions`}>
              <HyperLink
                lookLikeButton
                to={toVersionPath({ version: VERSION })}
              >
                See the experience
              </HyperLink>
            </nav>
          </div>

          <Attempts />
        </div>
      </header>
    </Layout>
  );
};

export default Banner;
