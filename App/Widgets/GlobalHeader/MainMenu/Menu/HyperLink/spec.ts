import { AnimationProps } from '@/Animation';
import { HyperLinkProps } from '@/Components';

export type Props = Pick<HyperLinkProps, 'to'> & AnimationProps;
