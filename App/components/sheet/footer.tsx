import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { CardFooter, type CardFooterProps } from '@/components/card';

const CLASS_NAME = 'kicl--components--sheet__footer';

/** The sheet's footer: stays at its bottom as it scrolls, over what runs under it. */
const SheetFooter = React.forwardRef<HTMLElement, CardFooterProps>(
  ({ className, ...rest }, ref) => (
    <CardFooter
      {...(rest as CardFooterProps)}
      className={classNames(
        CLASS_NAME,
        'kicl-position-sticky',
        'kicl-inset-block-end-0',
        'kicl-stuck-line-start',
        className
      )}
      ref={ref}
    />
  )
);

SheetFooter.displayName = 'SheetFooter';

export { SheetFooter };
