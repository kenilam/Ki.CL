import React from 'react';

// Components
import { Animation, Layout, SheetFooter } from 'design/components';

// Partials
import { Form } from './form';
import { useChanged } from './use-changed';

/**
 * Shows once the cell differs from the preset it started from: an obstacle
 * moved, added or taken away, or the cases set differently in Manual. It
 * saves the cell as it stands as a new preset, under the name given.
 */
const Unsaved: React.FunctionComponent = () => {
  const changed = useChanged();

  if (!changed) {
    return null;
  }

  return (
    <Animation property='slide-from-bottom'>
      <SheetFooter is='footer'>
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='1fr--max-content'
          gap='narrow'
        >
          <Form />
        </Layout>
      </SheetFooter>
    </Animation>
  );
};

export { Unsaved };
