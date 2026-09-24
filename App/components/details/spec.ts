import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export type Props = ComponentPropsWithoutRef<'details'> & {
  summary: ComponentPropsWithoutRef<'details'>['children'];
  /**
   * Whether the open/close marker is added after the summary. Turn it off to
   * place `DetailsMarker` yourself, such as inside a badge.
   */
  marker?: boolean;
};

export type SummaryProps = PropsWithChildren<
  ComponentPropsWithoutRef<'summary'>
>;
