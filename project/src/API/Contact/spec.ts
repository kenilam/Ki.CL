import * as Origin from '@/Component/Asynchronizer/spec';

export type Data = {
  error?: boolean;
  message: string;
  success?: boolean;
};

export type Status = Origin.Status;

export type Field = 'email' | 'id' | 'message' | 'name';
export type Value = boolean | number | string | FormDataEntryValue;
export type Params = {
  [name in Field]: Value;
};

export type Props = Omit<
  Origin.Props<Data>,
  'awaitFor' | 'awaitForOptions' | 'transitionType'
> & {
  params: Params;
};

export interface Config {
  Data:{
    message: {
      maxLength: number;
      minLength: number;
    };
  },
  
  Props: Omit<
    Origin.Props<Data>,
    'awaitFor' | 'transitionType'
  >;
}
