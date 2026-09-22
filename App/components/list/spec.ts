import type { LayoutProps } from '@/components';
import type { PolymorphicIsProps } from '@/components/polymorphic';

export type ListIs = 'ol' | 'ul';

export type Switch = PolymorphicIsProps<ListIs, object, 'ul'>;

export type Node = Switch;

export type Props = LayoutProps & Switch;
