import React from 'react';
import classNames from 'classnames';

import type { Props } from './spec';

import './styles.scss';

const CLASS_NAME = 'kicl--components--separator';

/**
 * Visual or semantic divider - API aligned with
 * https://ui.shadcn.com/docs/components/separator
 */
const Separator = React.forwardRef<HTMLDivElement, Props>(
  (
    { className, decorative = true, orientation = 'horizontal', ...rest },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      data-slot='separator'
      data-orientation={orientation}
      className={classNames(
        CLASS_NAME,
        `${CLASS_NAME}--${orientation}`,
        className
      )}
      {...rest}
    />
  )
);

Separator.displayName = 'Separator';

export type { Props as SeparatorProps } from './spec';
export { SEPARATOR_ORIENTATIONS } from './spec';
export type { SeparatorOrientation } from './spec';
export { Separator };
