import type { ComponentPropsWithoutRef } from 'react';

export type Page = {
  /** The page's anchor; its dot links to `#id`. */
  id: string;
  /** Read out for the dot, and shown on hover. */
  label: string;
};

export type Props = ComponentPropsWithoutRef<'nav'> & {
  pages: readonly Page[];
};
