import Api from "@/API/spec";
import { SyntheticEvent } from "react";

declare namespace Spec {
  type Actions = {
    type: Type;
    data?: Data;
  };

  type Params = Api.Contact.Params;

  type Data = Params & {
    hasChange?: boolean;
    shouldSubmit?: boolean;
  };

  type OnChange = (event: SyntheticEvent<HTMLFormElement>) => void;
  type OnError = () => void;
  type OnReset = (event: SyntheticEvent<HTMLFormElement>) => void;
  type OnSubmit = (event: SyntheticEvent<HTMLFormElement>) => void;
  type OnSuccess = () => void;

  type Reducer = (state: Data, actions: Actions) => void;

  type Type = "CHANGE" | "ERROR" | "SUBMIT" | "SUCCESS" | "RESET";

  type Types = {
    [name in Type]: Type;
  };

  type Props = {
    data?: Data;
    onChange: OnChange;
    onError: OnError;
    onReset: OnReset;
    onSuccess: OnSuccess;
    onSubmit: OnSubmit;
  };
}

export default Spec;
