import IAsynchronizer from '@/Component/Asynchronizer/spec';

declare module IApi {
  interface Props<T> {
    children: IAsynchronizer.Children<T>
  }
  
  module About {
    interface Data {
      sections: {
        About: string
      }
    }
    
    interface Props extends Omit<
      IAsynchronizer.Props<Data>,
      'awaitFor' | 'awaitForOptions' | 'transitionType'
      > {}
  }
  
  module Contact {
    interface Data {
      sections: {
        About: string
      }
    }
  
    type Field = 'email' | 'message' | 'name';
    type Value = boolean | number | string | FormDataEntryValue;
    type Params = {
      [name in Field]: Value;
    }
    
    interface Props extends Omit<
      IAsynchronizer.Props<Data>,
      'awaitFor' | 'awaitForOptions' | 'transitionType'
    > {
      params: Params
    }
  }
  
  module ContactConfig {
    interface Data {
      message: {
        maxLength: number,
        minLength: number
      }
    }
    
    interface Props extends Omit<
      IAsynchronizer.Props<ContactConfig.Data>,
      'awaitFor'
      > {}
  }
}

export default IApi;
