import IAsynchronizer from '@/Component/Asynchronizer/spec';

declare namespace IApi {
  interface Props<T> {
    children: IAsynchronizer.Children<T>;
  }

  namespace About {
    interface Data {
      sections: {
        About: string;
      };
    }

    interface Props
      extends Omit<
        IAsynchronizer.Props<Data>,
        'awaitFor' | 'awaitForOptions' | 'transitionType'
      > {}
  }

  namespace Contact {
    interface Data {
      sections: {
        About: string;
      };
    }

    type Status = IAsynchronizer.Status;

    type Field = 'email' | 'id' | 'message' | 'name';
    type Value = boolean | number | string | FormDataEntryValue;
    type Params = {
      [name in Field]: Value;
    };

    interface Props
      extends Omit<
        IAsynchronizer.Props<Data>,
        'awaitFor' | 'awaitForOptions' | 'transitionType'
      > {
      params: Params;
    }
  }

  namespace ContactConfig {
    interface Data {
      message: {
        maxLength: number;
        minLength: number;
      };
    }

    interface Props
      extends Omit<IAsynchronizer.Props<ContactConfig.Data>, 'awaitFor'> {}
  }
}

export default IApi;
