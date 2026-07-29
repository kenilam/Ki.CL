import type {
  DetailsHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

export type Props = PropsWithChildren<
  DetailsHTMLAttributes<HTMLDetailsElement>
> & {
  summary: DetailsHTMLAttributes<HTMLDetailsElement>['children'];
};

export type SummaryProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;
