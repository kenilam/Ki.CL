import Phase from '@/View/Home/Component/Phase/spec';

declare module Spec {
  type ClassName = ClassNames<'default'>;
  type Words = (Phase.Word[] | string)[];
  
  type Props = unknown;
}

export default Spec;
