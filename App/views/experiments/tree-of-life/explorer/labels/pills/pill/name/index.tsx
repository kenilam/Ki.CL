import React from 'react';

// Components
import { Badge } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Store
import { registry } from '@/views/experiments/tree-of-life/explorer/label-store';

type Props = { id: string };

const Name: React.FunctionComponent<Props> = ({ id }) => {
  const label = registry.get(id);

  if (!label) {
    return null;
  }

  return (
    <Badge
      is='span'
      variant={label.accent ? 'secondary' : 'ghost'}
      // On the badge, not the link: `Badge` declares these on itself, which beats an inherited value.
      style={
        label.accent
          ? ({
              '--kicl--components--badge--background-color': label.accent,
              '--kicl--components--badge--color': `contrast-color(var(--kicl--components--badge--background-color))`,
            } as React.CSSProperties)
          : undefined
      }
      size={label.accent ? 'large' : 'small'}
    >
      {label.text}
      {label.accent ? <Tb.TbInfoCircle aria-hidden /> : null}
    </Badge>
  );
};

export { Name };
