let obj: any = null;

export class IResourcesData {
  public readonly siteName: string;
  public readonly description: string;
  public readonly view: View;
  public readonly component: Component;
  public readonly miscellaneous: Miscellaneous;
  public static Parse(d: string): IResourcesData {
    return IResourcesData.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): IResourcesData {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.siteName, false, field + '.siteName');
    checkString(d.description, false, field + '.description');
    d.view = View.Create(d.view, field + '.view');
    d.component = Component.Create(d.component, field + '.component');
    d.miscellaneous = Miscellaneous.Create(d.miscellaneous, field + '.miscellaneous');
    return new IResourcesData(d);
  }
  private constructor(d: any) {
    this.siteName = d.siteName;
    this.description = d.description;
    this.view = d.view;
    this.component = d.component;
    this.miscellaneous = d.miscellaneous;
  }
}

export class View {
  public readonly pageNotFound: PageNotFound;
  public readonly home: Home;
  public readonly about: AboutOrContact;
  public readonly works: Works;
  public readonly contact: AboutOrContact;
  public static Parse(d: string): View {
    return View.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): View {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.pageNotFound = PageNotFound.Create(d.pageNotFound, field + '.pageNotFound');
    d.home = Home.Create(d.home, field + '.home');
    d.about = AboutOrContact.Create(d.about, field + '.about');
    d.works = Works.Create(d.works, field + '.works');
    d.contact = AboutOrContact.Create(d.contact, field + '.contact');
    return new View(d);
  }
  private constructor(d: any) {
    this.pageNotFound = d.pageNotFound;
    this.home = d.home;
    this.about = d.about;
    this.works = d.works;
    this.contact = d.contact;
  }
}

export class PageNotFound {
  public readonly name: string;
  public readonly content: ContentOrDefault;
  public static Parse(d: string): PageNotFound {
    return PageNotFound.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): PageNotFound {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.name, false, field + '.name');
    d.content = ContentOrDefault.Create(d.content, field + '.content');
    return new PageNotFound(d);
  }
  private constructor(d: any) {
    this.name = d.name;
    this.content = d.content;
  }
}

export class ContentOrDefault {
  public readonly message: string;
  public static Parse(d: string): ContentOrDefault {
    return ContentOrDefault.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): ContentOrDefault {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.message, false, field + '.message');
    return new ContentOrDefault(d);
  }
  private constructor(d: any) {
    this.message = d.message;
  }
}

export class Home {
  public readonly path: string;
  public readonly name: string;
  public readonly content: Content;
  public static Parse(d: string): Home {
    return Home.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Home {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.path, false, field + '.path');
    checkString(d.name, false, field + '.name');
    d.content = Content.Create(d.content, field + '.content');
    return new Home(d);
  }
  private constructor(d: any) {
    this.path = d.path;
    this.name = d.name;
    this.content = d.content;
  }
}

export class Content {
  public readonly heading: string;
  public readonly profession: string[] | null;
  public readonly loader: Loader;
  public static Parse(d: string): Content {
    return Content.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Content {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.heading, false, field + '.heading');
    checkArray(d.profession, field + '.profession');
    if (d.profession) {
      for (let i = 0; i < d.profession.length; i++) {
        checkString(d.profession[i], false, field + '.profession' + '[' + i + ']');
      }
    }
    if (d.profession === undefined) {
      d.profession = null;
    }
    d.loader = Loader.Create(d.loader, field + '.loader');
    return new Content(d);
  }
  private constructor(d: any) {
    this.heading = d.heading;
    this.profession = d.profession;
    this.loader = d.loader;
  }
}

export class Loader {
  public readonly text: string;
  public static Parse(d: string): Loader {
    return Loader.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Loader {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.text, false, field + '.text');
    return new Loader(d);
  }
  private constructor(d: any) {
    this.text = d.text;
  }
}

export class AboutOrContact {
  public readonly path: string;
  public readonly name: string;
  public readonly message: string;
  public static Parse(d: string): AboutOrContact {
    return AboutOrContact.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): AboutOrContact {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.path, false, field + '.path');
    checkString(d.name, false, field + '.name');
    checkString(d.message, false, field + '.message');
    return new AboutOrContact(d);
  }
  private constructor(d: any) {
    this.path = d.path;
    this.name = d.name;
    this.message = d.message;
  }
}

export class Works {
  public readonly path: string;
  public readonly name: string;
  public readonly message: string;
  public readonly content: Content1;
  public readonly view: View1;
  public static Parse(d: string): Works {
    return Works.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Works {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.path, false, field + '.path');
    checkString(d.name, false, field + '.name');
    checkString(d.message, false, field + '.message');
    d.content = Content1.Create(d.content, field + '.content');
    d.view = View1.Create(d.view, field + '.view');
    return new Works(d);
  }
  private constructor(d: any) {
    this.path = d.path;
    this.name = d.name;
    this.message = d.message;
    this.content = d.content;
    this.view = d.view;
  }
}

export class Content1 {
  public readonly loader: Loader;
  public static Parse(d: string): Content1 {
    return Content1.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Content1 {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.loader = Loader.Create(d.loader, field + '.loader');
    return new Content1(d);
  }
  private constructor(d: any) {
    this.loader = d.loader;
  }
}

export class View1 {
  public readonly work: Work;
  public static Parse(d: string): View1 {
    return View1.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): View1 {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.work = Work.Create(d.work, field + '.work');
    return new View1(d);
  }
  private constructor(d: any) {
    this.work = d.work;
  }
}

export class Work {
  public readonly path: string;
  public readonly name: string;
  public readonly message: string;
  public readonly content: Content1;
  public static Parse(d: string): Work {
    return Work.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Work {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.path, false, field + '.path');
    checkString(d.name, false, field + '.name');
    checkString(d.message, false, field + '.message');
    d.content = Content1.Create(d.content, field + '.content');
    return new Work(d);
  }
  private constructor(d: any) {
    this.path = d.path;
    this.name = d.name;
    this.message = d.message;
    this.content = d.content;
  }
}

export class Component {
  public readonly spinner: Spinner;
  public static Parse(d: string): Component {
    return Component.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Component {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.spinner = Spinner.Create(d.spinner, field + '.spinner');
    return new Component(d);
  }
  private constructor(d: any) {
    this.spinner = d.spinner;
  }
}

export class Spinner {
  public readonly content: Content2;
  public static Parse(d: string): Spinner {
    return Spinner.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Spinner {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.content = Content2.Create(d.content, field + '.content');
    return new Spinner(d);
  }
  private constructor(d: any) {
    this.content = d.content;
  }
}

export class Content2 {
  public readonly default: ContentOrDefault;
  public static Parse(d: string): Content2 {
    return Content2.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Content2 {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.default = ContentOrDefault.Create(d.default, field + '.default');
    return new Content2(d);
  }
  private constructor(d: any) {
    this.default = d.default;
  }
}

export class Miscellaneous {
  public readonly months: string[] | null;
  public static Parse(d: string): Miscellaneous {
    return Miscellaneous.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): Miscellaneous {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof(d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkArray(d.months, field + '.months');
    if (d.months) {
      for (let i = 0; i < d.months.length; i++) {
        checkString(d.months[i], false, field + '.months' + '[' + i + ']');
      }
    }
    if (d.months === undefined) {
      d.months = null;
    }
    return new Miscellaneous(d);
  }
  private constructor(d: any) {
    this.months = d.months;
  }
}

function throwNull2NonNull(field: string, d: any): never {
  return errorHelper(field, d, 'non-nullable object', false);
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, 'object', nullable);
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, 'object', nullable);
}
function checkArray(d: any, field: string): void {
  if (!Array.isArray(d) && d !== null && d !== undefined) {
    errorHelper(field, d, 'array', true);
  }
}
function checkString(d: any, nullable: boolean, field: string): void {
  if (typeof(d) !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, 'string', nullable);
  }
}
function errorHelper(field: string, d: any, type: string, nullable: boolean): never {
  if (nullable) {
    type += ', null, or undefined';
  }
  throw new TypeError('Expected ' + type + ' at ' + field + ' but found:\n' + JSON.stringify(d) + '\n\nFull object:\n' + JSON.stringify(obj));
}
