import type { LayoutProps } from '@/Components';
import type { PolymorphicIsProps } from '@/Components/polymorphic';

export type ListIs = 'ol' | 'ul';

export type Switch = PolymorphicIsProps<ListIs, object, 'ul'>;

export type Node = Switch;

export type Props = LayoutProps & Switch;

export default {};
