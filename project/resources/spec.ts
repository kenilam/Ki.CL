type Message = string;
type Name = string;
type Path = string;
type Description = string;
type SiteName = string;

type Content = {
  [name: string]: Record<string, unknown> | string
}

type Component = {
  content?: Content;

  [name: string]: Content;
}

type Components = {
  [name: string]: Component;
}

type Miscellaneous = {
  months?: string[] | null;
}

type View = {
  component?: Components;
  content?: Content;
  message?: Message;
  name: Name;
  path?: Path;
  view?: Views;
}

type Routes = 'about' | 'contact' | 'home' | 'pageNotFound' | 'works' | 'work';

type Views = {
  [name in Routes]?: View;
}

export class Data {
  component: Component;
  description: Description;
  miscellaneous: Miscellaneous;
  siteName: SiteName;
  view: Views;
}

export default { Data };
