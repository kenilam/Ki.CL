import Origin from '@/Component/Asynchronizer/spec';

declare module Spec {
  namespace About {
    type Data = {
      sections: {
        About: string;
      };
    };

    type Props = Omit<
      Origin.Props<Data>,
      'awaitFor' | 'awaitForOptions' | 'transitionType'
    >;
  }

  namespace Contact {
    type Data = {
      error?: boolean;
      message: string;
      success?: boolean;
    };

    type Status = Origin.Status;

    type Field = 'email' | 'id' | 'message' | 'name';
    type Value = boolean | number | string | FormDataEntryValue;
    type Params = {
      [name in Field]: Value;
    };

    type Props = Omit<
      Origin.Props<Data>,
      'awaitFor' | 'awaitForOptions' | 'transitionType'
    > & {
      params: Params;
    };
  }

  namespace ContactConfig {
    type Data = {
      message: {
        maxLength: number;
        minLength: number;
      };
    };

    type Props = Omit<
      Origin.Props<ContactConfig.Data>,
      'awaitFor' | 'transitionType'
    >;
  }
}

export default Spec;
