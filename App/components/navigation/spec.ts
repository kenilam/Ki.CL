import type React from 'react';

import type { LayoutProps } from '@/components';
import type { ListProps } from '@/components/list';

/** Layout props apply to the list inside the `nav`, not the `nav` itself. */
export type Props = React.ComponentPropsWithoutRef<'nav'> &
  LayoutProps &
  Pick<ListProps, 'is'>;
