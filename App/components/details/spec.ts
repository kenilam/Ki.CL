import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export type Props = ComponentPropsWithoutRef<'details'> & {
  summary: ComponentPropsWithoutRef<'details'>['children'];
};

export type SummaryProps = PropsWithChildren<
  ComponentPropsWithoutRef<'summary'>
>;
