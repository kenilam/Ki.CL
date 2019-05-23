import * as ICommonText from '@View/Home/Graphic/Partial/Common/Text/spec';

declare module IName {
  interface Props {
    tick?: boolean;
    style: Style,
    text: string
  }
  
  type Style = ICommonText.Style;
}

export = IName;