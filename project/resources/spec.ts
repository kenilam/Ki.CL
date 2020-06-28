declare module Spec {
  module Data {
    type Message = string;
    type Name = string;
    type Path = string;
    type Description = string;
    type SiteName = string;

    interface Content {
      [name: string]: Record<string, unknown> | string
    }

    interface Component {
      content?: Content;

      [name: string]: Content;
    }

    interface Components {
      [name: string]: Component;
    }

    interface Miscellaneous {
      months?: string[] | null;
    }

    interface View {
      component?: Components;
      content?: Content;
      message?: Message;
      name: Name;
      path?: Path;
      view?: Views;
    }

    interface Views {
      [name: string]: View;
    }
  }

  export class Data {
    component: Spec.Data.Component;
    description: Spec.Data.Description;
    miscellaneous: Spec.Data.Miscellaneous;
    siteName: Spec.Data.SiteName;
    view: Spec.Data.Views;
  }
}

export default Spec;
