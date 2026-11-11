import React from 'react';

// Partials
import { Description } from './description';
import { Meta } from './meta';
import { TaxonVisual } from './taxon-visual';

/** What the focused taxon is: its rank and id, its plate and its description. */
const About: React.FunctionComponent = () => (
  <>
    <Meta />
    <TaxonVisual />
    <Description />
  </>
);

export { About };
