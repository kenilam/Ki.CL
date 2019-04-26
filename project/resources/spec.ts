interface Component {
  spinner: {
    content: {
      default: any
    }
  }
}
interface Content {
  [name: string]: any;
}
interface Miscellaneous {
  months?: (string)[] | null;
}
interface Views {
  [name: string]: View;
}
interface View {
  content?: Content;
  message?: string;
  name: string;
  path?: string;
  view?: Views;
}

export interface data {
  component: Component;
  description: string;
  miscellaneous: Miscellaneous;
  siteName: string;
  view: Views;
}
