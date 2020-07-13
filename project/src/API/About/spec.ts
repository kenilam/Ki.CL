import * as Origin from '@/Component/Asynchronizer/spec';

export type Data = {
  sections: {
    About: string;
  };
};

export type Props = Omit<
  Origin.Props<Data>,
  'awaitFor' | 'awaitForOptions' | 'transitionType'
>;
