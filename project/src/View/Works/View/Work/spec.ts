declare module Spec {
  interface Match {
    params: Params;
  }

  type Param = 'projectId';

  type Params = {
    [name in Param]: string;
  };

  type Props = unknown;
}

export default Spec;
