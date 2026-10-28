// Routes
import { Route } from 'design/router';

// Constants
import { PATH } from './constants';

/** Nested under the taxon, so the tree stays mounted while the dialog opens and closes. */
const Details = (
  <Route
    path={PATH}
    lazy={async () => {
      const { Details: Component } = await import('./contents');

      return { Component };
    }}
  />
);

export { PATH, Details };
