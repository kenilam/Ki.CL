import * as Origin from '@/Component/Asynchronizer/spec';

export type Match = {
  params: Params;
}

export type Param = 'work';

export type Params = {
  [name in Param]: string;
};

export type Type = 'image' | 'text';

type Color = {
  r: number,
  g: number,
  b: number
};

type Copyright = {
  license: string,
  description: string,
  license_id: number,
  label: string
};

export type Image = {
  type: 'image',
  alt_text_for_editor: string,
  alt_text: string,
  color: Color,
  src: string,
  width: number,
  height: number,
  exif: unknown[]
};

export type Text = {
  type: 'text' | 'image',
  text: string,
  text_plain: string
};

type Module = Image | Text;

type Modules = Module[];

type Stats = {
  views: number,
  appreciations: number,
  comments: number
};

type Synonym = {
  tag_id: number,
  synonym_id: number,
  name: string,
  title: string,
  url: string,
  download_url: string,
  gallery_url: string,
  authenticated: number,
  type: number,
  icon_url: string,
  icon_url_2x: string
};

type Tool = {
  id: number,
  title: string,
  category: string,
  category_label: string,
  category_id: number,
  synonym?: Synonym,
  approved: string,
  url: string
};

type Tools = Tool[];

export type Data = {
  id: number,
  name: string,
  published_on: Date,
  created_on: Date,
  modified_on: Date,
  url: string,
  fields: string[],
  stats: Stats,
  tags: string[],
  description: string,
  allow_comments: number,
  modules: Modules,
  copyright: Copyright,
  tools: Tools,
  cover: string
}[];

export type Props = Omit<
  Origin.Props<Data>,
  'awaitFor' | 'awaitForOption'
>;
