import * as Origin from '@/Component/Asynchronizer/spec';

export type Type = 'image' | 'text';

export type Data = {
  id: number
  image: {
    height: number,
    src: string,
    type: Type,
    width: number,
  },
  name: string,
}[];

export type Props = Omit<
  Origin.Props<Data>,
  'awaitFor' | 'awaitForOption'
>;
