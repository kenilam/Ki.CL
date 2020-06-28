import Phase from '@/View/Home/Phase/spec';

declare module Spec {
  type ClassName = ClassNames<'default'>;
  type Words = (Phase.Word[] | string)[];
  
  type Props = unknown;
}

export default Spec;
