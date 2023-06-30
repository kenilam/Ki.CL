import { type PropsWithChildren } from 'react';

// Components
import { type HeadingProps } from '@/Components';

export type Props = PropsWithChildren & {
  heading?: HeadingProps['children'];
};
