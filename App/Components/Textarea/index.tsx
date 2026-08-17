import React from 'react';
import classNames from 'classnames';

import type { Props } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--textarea';

/**
 * Multiline text control - API aligned with
 * https://ui.shadcn.com/docs/components/base/textarea
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...rest }, ref) => (
    <textarea
      ref={ref}
      data-slot='textarea'
      className={classNames(CLASS_NAME, 'kicl-font-size-small', className)}
      {...rest}
    />
  )
);

Textarea.displayName = 'Textarea';

export type { Props as TextareaProps } from './Spec';
export default Textarea;
