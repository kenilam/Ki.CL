import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import type { Gap } from '@/components/layout/spec';

export type Props = ComponentPropsWithoutRef<'details'> & {
  summary: ComponentPropsWithoutRef<'details'>['children'];
  /**
   * Whether the open/close marker is added after the summary. Turn it off to
   * place `DetailsMarker` yourself, such as inside a badge.
   */
  marker?: boolean;
  /** Lays the content out as a column with this gap, so it needs no wrapper. */
  gap?: Gap;
};

export type SummaryProps = PropsWithChildren<
  ComponentPropsWithoutRef<'summary'>
>;
