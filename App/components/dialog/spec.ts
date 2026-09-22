import React from 'react';

// Icons
import { IconType } from '@/icons';

/**
 * Name the dialog with `title` (a visible heading it is labelled by), or with
 * `aria-label` / `aria-labelledby` when there is no visible title.
 */
export type Props = Omit<React.ComponentPropsWithoutRef<'dialog'>, 'title'> & {
  footer?: React.ReactNode;
  title?: React.ReactNode;
} & (
    | {
        dense?: boolean;
        fullScreen?: never;
      }
    | {
        dense?: never;
        fullScreen?: boolean;
      }
  ) &
  (
    | {
        closeIcon?: IconType;
        closable?: true;
      }
    | {
        closeIcon?: never;
        closable?: false | 'keyboard';
      }
  );
