import React from 'react';

// Components
import { Heading, HyperLink, Text } from '@/components';

// Partials
import { Figure } from './figure';

// Constants
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { VERSION } from '@/views/experiments/tree-of-life/versions/v15/constants';
import { V14 } from './constants';

const FifteenAttempts: React.FunctionComponent = () => (
  <>
    <Heading is='h2' className='kicl-font-size-large'>
      Fifteen attempts
    </Heading>

    <Text is='p'>
      Each version started over rather than revising the one before it, which is
      why they’re all still online.{' '}
      <HyperLink to={toVersionPath({ version: '1' })}>v1</HyperLink> to{' '}
      <HyperLink to={toVersionPath({ version: '8' })}>v8</HyperLink> went into
      WebGL: the whole clade laid out at once, on a cream background borrowed
      from the poster. Past a few hundred taxa, though, the layout collapsed
      into a mat of dots, and every dot was the same few pixels no matter where
      it sat.
    </Text>

    <Text is='p'>
      <HyperLink to={toVersionPath({ version: '9' })}>v9</HyperLink> to{' '}
      <HyperLink to={toVersionPath({ version: '13' })}>v13</HyperLink> went the
      other way and turned into documents: DOM and SVG, tip first, one clade at
      a time, drag and zoom instead of a fixed composition. Now you could read a
      name. What you’d lost was any sense of distance, of how far you’d
      travelled from the origin, and the whole thing felt flat.
    </Text>

    <Figure
      data={V14}
      alt='The v14 view: a wide, pale map of the tree with labelled nodes spread across the frame.'
      caption={
        <>
          <HyperLink to={toVersionPath({ version: '14' })}>v14</HyperLink>, the
          map. You can see all of it
        </>
      }
    />

    <Text is='p'>
      <HyperLink to={toVersionPath({ version: '14' })}>v14</HyperLink> was the
      widest of them. It showed everything, and nothing stood out. So{' '}
      <HyperLink to={toVersionPath({ version: VERSION })}>v{VERSION}</HyperLink>{' '}
      gave it up. It frames one taxon and whatever sits near it, lets the rest
      fade into the background, and puts the route in charge of what you’re
      looking at.
    </Text>
  </>
);

export { FifteenAttempts };
