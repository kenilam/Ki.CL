import React from 'react';

// Components
import { Heading, HyperLink, Text } from '@/components';

const WhereItStarted: React.FunctionComponent = () => (
  <>
    <Heading is='h2' className='kicl-font-size-large'>
      Where it started
    </Heading>

    <Text is='p'>
      I started from{' '}
      <HyperLink
        to='https://observablehq.com/@d3/tree-of-life'
        target='_blank'
        rel='noreferrer'
      >
        D3’s Tree of Life
      </HyperLink>
      . It’s a radial dendrogram: curved links, tips labelled around the
      circumference, branch lengths that carry real distance. As a diagram of
      structure it’s complete. You can see the shape of a phylogeny and how far
      apart its members sit.
    </Text>

    <Text is='p'>
      What you can’t see is what any of them look like. Every tip is just a
      name. I wanted the shape and the creatures on the same page.
    </Text>
  </>
);

export { WhereItStarted };
