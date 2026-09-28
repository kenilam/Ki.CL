import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { SegmentedProps } from './spec';

// Styles
import './styles.scss';

// Context
import { SegmentedContext } from './context';

// Partials
import { SegmentedItem } from './item';

const CLASS_NAME = 'kicl--components--segmented';

/**
 * A segmented control: one choice of a few, side by side on one track, as
 * a native `<fieldset>` of radios. The chosen option's highlight slides to
 * it, anchored to that option in CSS. Name it with `aria-label`, or a
 * `<legend>` as the first child.
 */
const Segmented = React.forwardRef<HTMLFieldSetElement, SegmentedProps>(
  (
    { children, className, defaultValue, name, onValueChange, value, ...rest },
    ref
  ) => {
    const id = useId();

    return (
      <SegmentedContext.Provider
        value={{
          defaultValue,
          name: name ?? id,
          onValueChange: (next) => onValueChange?.(next),
          value,
        }}
      >
        <fieldset
          className={classNames(
            CLASS_NAME,
            'kicl-border-radius-md',
            'kicl-padding-block-narrowest',
            'kicl-padding-inline-narrowest',
            'kicl-position-relative',
            className
          )}
          ref={ref}
          {...rest}
        >
          {children}
        </fieldset>
      </SegmentedContext.Provider>
    );
  }
);

Segmented.displayName = 'Segmented';

export type { SegmentedItemProps, SegmentedProps } from './spec';
export { Segmented, SegmentedItem };
