import React from 'react';

// Icons
import { IconType } from '@/Icons';

export type Props = React.DialogHTMLAttributes<HTMLDialogElement> & {
  footer?: React.ReactNode;
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
