declare namespace Spec {
  interface Match {
    params: Params;
  }

  type Param = "projectId";

  type Params = {
    [name in Param]: string;
  };

  interface Props {}
}

export default Spec;
