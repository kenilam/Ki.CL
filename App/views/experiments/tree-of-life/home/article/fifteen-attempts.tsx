import React, { useId } from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Partials
import { Figure } from './figure';

// Constants
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { VERSION } from '@/views/experiments/tree-of-life/versions/v15/constants';
import { V14 } from './constants';

const FifteenAttempts: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          Fifteen attempts
        </Heading>

        <Text is='p'>
          Each version started over instead of revising the last, so they’re all
          still online.{' '}
          <HyperLink to={toVersionPath({ version: '1' })}>v1</HyperLink> to{' '}
          <HyperLink to={toVersionPath({ version: '8' })}>v8</HyperLink> used
          WebGL to lay out the whole clade at once, on a cream background
          borrowed from the poster. Past a few hundred taxa the layout collapsed
          into a mat of dots, each the same few pixels wherever it sat.
        </Text>

        <Text is='p'>
          <HyperLink to={toVersionPath({ version: '9' })}>v9</HyperLink> to{' '}
          <HyperLink to={toVersionPath({ version: '13' })}>v13</HyperLink> went
          the other way, building DOM and SVG documents tip first, one clade at
          a time, with drag and zoom instead of a fixed composition. Names
          became readable, but the sense of distance from the origin was gone
          and the whole thing felt flat.
        </Text>

        <Figure
          data={V14}
          alt='The v14 view: a wide, pale map of the tree with labelled nodes spread across the frame.'
          caption={
            <>
              <HyperLink to={toVersionPath({ version: '14' })}>v14</HyperLink>,
              the map, with the whole tree in view
            </>
          }
        />

        <Text is='p'>
          <HyperLink to={toVersionPath({ version: '14' })}>v14</HyperLink> was
          the widest of them. It showed everything and nothing stood out.{' '}
          <HyperLink to={toVersionPath({ version: VERSION })}>
            v{VERSION}
          </HyperLink>{' '}
          dropped that. It frames one taxon and whatever sits near it, fades the
          rest into the background and lets the route decide what’s on screen.
        </Text>
      </section>
    </Layout>
  );
};

export { FifteenAttempts };
