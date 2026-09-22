import React from 'react';

// Spec
import * as Spec from './spec';

const OL = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ children, ...props }, ref) => {
  return (
    <ol {...props} ref={ref}>
      {children}
    </ol>
  );
});

OL.displayName = 'List.OL';

const UL = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, ...props }, ref) => {
  return (
    <ul {...props} ref={ref}>
      {children}
    </ul>
  );
});

UL.displayName = 'List.UL';

const Switch = React.forwardRef<
  HTMLOListElement | HTMLUListElement,
  Spec.Switch
>(({ is = 'ul', ...props }, ref) => {
  const hostProps = props as React.HTMLAttributes<HTMLElement>;

  switch (is) {
    case 'ol':
      return (
        <OL
          {...hostProps}
          data-is={is}
          ref={ref as React.ForwardedRef<HTMLOListElement>}
        />
      );
    case 'ul':
      return (
        <UL
          {...hostProps}
          data-is={is}
          ref={ref as React.ForwardedRef<HTMLUListElement>}
        />
      );
    default: {
      const _exhaustive: never = is;
      throw new Error(`Unsupported node type: ${_exhaustive}`);
    }
  }
});

Switch.displayName = 'List.Switch';

export { Switch };
