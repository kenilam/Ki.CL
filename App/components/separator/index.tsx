import React from 'react';
import classNames from 'classnames';

import type { Props } from './spec';

import './styles.scss';

const CLASS_NAME = 'kicl--components--separator';

/**
 * Visual or semantic divider - API aligned with
 * https://ui.shadcn.com/docs/components/separator
 *
 * A semantic one is an `<hr>`, which is already a separator; only the
 * vertical orientation needs saying.
 */
const Separator = React.forwardRef<HTMLElement, Props>(
  (
    { className, decorative = true, orientation = 'horizontal', ...rest },
    ref
  ) => {
    const props = {
      'data-slot': 'separator',
      'data-orientation': orientation,
      className: classNames(
        CLASS_NAME,
        `${CLASS_NAME}--${orientation}`,
        className
      ),
      ...rest,
    };

    if (decorative) {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} role='none' {...props} />
      );
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        aria-orientation={orientation === 'vertical' ? orientation : undefined}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export type { Props as SeparatorProps } from './spec';
export { SEPARATOR_ORIENTATIONS } from './spec';
export type { SeparatorOrientation } from './spec';
export { Separator };
