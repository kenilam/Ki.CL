import React from 'react';

import { LayoutProps } from '@/Components';

type Node =
  | React.HTMLAttributes<HTMLOListElement>
  | React.HTMLAttributes<HTMLUListElement>;

type Switch = Node & {
  is?: Extract<keyof React.JSX.IntrinsicElements, 'ol' | 'ul'>;
};

type Props = LayoutProps & Switch;

export { type Node, type Props, type Switch };
export default {};
