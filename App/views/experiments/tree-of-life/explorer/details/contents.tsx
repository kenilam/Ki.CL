import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Dialog, Heading } from 'design/components';

// Routes
import { useNavigate } from 'design/router';

// Context
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';

// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';
import { toPath } from '@/views/experiments/tree-of-life/constants';

// Tree
import { labelFor, type TreeNode } from '@/views/experiments/tree-of-life/tree';

// About
import { About } from './about';

/**
 * The focused taxon's details, in the page for as long as the route ends in
 * `details` and gone from it otherwise.
 *
 * Every way in and out is a view transition, so the dialog is removed at once
 * and the browser animates what it looked like. Closing it is turned into a
 * route change before the dialog closes itself, and goes back to the taxon in
 * place of this entry, so Back doesn't reopen it. Back is animated by the
 * router, which replays a transition between two routes it has run one
 * between before.
 */
const Details: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const navigate = useNavigate();
  const { find, focus } = useTreeOfLifeContext();
  const taxon = focus ? find(focus) : null;

  // Nothing to describe until the lineage has resolved.
  if (!taxon) {
    return null;
  }

  const close = () =>
    navigate(toPath(focus), { replace: true, viewTransition: true });

  const title =
    taxon.nodeId === ROOT_NODE_ID
      ? t('origin')
      : labelFor(taxon as TreeNode) || t('unnamed_node');

  return (
    <Dialog
      open
      header={
        <Heading dense is='h2' lookLike='h4'>
          {title}
        </Heading>
      }
      /*
       * A cancel the browser lets the page refuse is held off and replayed as
       * a route change, so the dialog is still on screen for the transition to
       * picture. One it doesn't (Escape again with no click in between) closes
       * the dialog anyway, and the route follows on close.
       */
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
