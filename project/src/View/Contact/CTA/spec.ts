import ICSSTransition from '@/Component/CSSTransition/spec';
import IApi from '@/API/spec';

declare namespace ICTA {
  type ClassNames = IClassNames<'default'>;

  interface Props extends ICSSTransition.Props, IApi.Contact.Status {}
}

export default ICTA;
