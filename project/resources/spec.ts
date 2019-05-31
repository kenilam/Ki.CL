declare module IResources {
  module Data {
    type Message = string;
    type Name = string;
    type Path = string;
    type Description = string;
    type SiteName = string;
    
    interface Content {
      [name: string]: any;
    }
    
    interface Component {
      content?: Content;
  
      [name: string]: Content;
    }
    
    interface Components {
      [name: string]: Component;
    }
    
    interface Miscellaneous {
      months?: (string)[] | null;
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
    component: IResources.Data.Component;
    description: IResources.Data.Description;
    miscellaneous: IResources.Data.Miscellaneous;
    siteName: IResources.Data.SiteName;
    view: IResources.Data.Views;
  }
}

export = IResources;
