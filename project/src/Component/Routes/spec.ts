import * as Transition from '@/Component/Transition/spec';

export type Props = Omit<Transition.Props, 'key'> & {
  level?: number
};