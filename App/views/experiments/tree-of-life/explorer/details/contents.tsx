import React from 'react';

// Components
import { Dialog } from 'design/components';

// Hooks
import { useClose } from './use-close';
import { useTaxon } from './use-taxon';

// Partials
import { About } from './about';
import { Title } from './title';

/** The focused taxon's details, open while the route ends in `details`. */
const Details: React.FunctionComponent = () => {
  const taxon = useTaxon();
  const close = useClose();

  // Nothing to describe until the lineage has resolved.
  if (!taxon) {
    return null;
  }

  return (
    <Dialog
      open
      header={<Title />}
      // A cancel the page can refuse becomes a route change, so the transition can picture the dialog.
      onCancel={(event) => {
        if (event.cancelable) {
          event.preventDefault();
          close();
        }
      }}
      onClose={close}
    >
      <About />
    </Dialog>
  );
};

export { Details };
