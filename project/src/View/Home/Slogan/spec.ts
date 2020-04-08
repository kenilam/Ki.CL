import IPhase from '@/View/Home/Phase/spec';

declare namespace ISlogan {
  type ClassNames = IClassNames<'default'>;
  type Words = (IPhase.Word[] | string)[];

  interface Props {}
}

export default ISlogan;
