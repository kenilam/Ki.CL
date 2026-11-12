import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { HyperLink } from 'design/components';

// Constants
import { toPath } from '@/views/experiments/tree-of-life/constants';
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/constants';
import { toPath as toDetailsPath } from '@/views/experiments/tree-of-life/explorer/details-path';

// Store
import { registry } from '@/views/experiments/tree-of-life/explorer/label-store';
import { pills } from '@/views/experiments/tree-of-life/explorer/labels/mounted';

// Partials
import { Name } from './name';

// Styles
import './styles.scss';

type Props = {
  /** The taxon the label names. */
  id: string;
};

// The layer beneath takes no pointer events, so a drag anywhere but a name still turns the view.
const PILL_CLASS = classNames(
  `${CLASS_NAME}__labels__pill`,
  'kicl-border-radius-sm',
  'kicl-display-inline-flex',
  'kicl-inset-block-start-0',
  'kicl-inset-inline-start-0',
  'kicl-text-nowrap',
  'kicl-position-absolute',
  'kicl-pointer-events-auto'
);

/** The routed taxon's name opens its details, as the taxon does on the canvas. */
const Pill: React.FunctionComponent<Props> = ({ id }) => {
  const label = registry.get(id);

  if (!label) {
    return null;
  }

  return (
    <HyperLink
      unstyled
      aria-haspopup={label.accent ? 'dialog' : undefined}
      data-node={id}
      to={label.accent ? toDetailsPath(id) : toPath(id)}
      viewTransition={Boolean(label.accent)}
      className={PILL_CLASS}
      ref={(node: HTMLAnchorElement | null) => {
        if (node) {
          pills.set(id, node);

          return;
        }

        pills.delete(id);
      }}
    >
      <Name id={id} />
    </HyperLink>
  );
};

export { Pill };
