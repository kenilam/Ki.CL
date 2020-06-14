import { CSSTransition, Spinner } from "@/Components";
import { CSSUnit, Fetch } from "@/Helper";
import React, { useCallback, useEffect, useState } from "react";
import Style from "./Style";
import Spec from "./spec";

const awaitDelay = CSSUnit(Style.delay);

function Asynchronizer<T>({
  awaitFor,
  awaitForOptions,
  children,
  onError,
  onSuccess,
  preventBy,
  transitionType,
}: Spec.Props<T>) {
  let awaitTimer: number;

  const [data, updateData] = useState<Spec.Data<T>>(null);

  const fetch = useCallback(() => {
    const { cancel: abort, trigger: origin } = Fetch<T>(
      awaitFor,
      awaitForOptions
    );

    const handler = () =>
      origin()
        .then((result) => {
          const data = { success: true, result };

          const callback = () => {
            onSuccess(data);
          };

          updateData(data);

          if (onSuccess) {
            awaitTimer = window.setTimeout(callback, 100);
          }

          return data;
        })
        .catch((result) => {
          const data = { error: true, result };

          const callback = () => {
            onError(data);
          };

          updateData(data);

          if (onError) {
            awaitTimer = window.setTimeout(callback, 100);
          }

          return data;
        });

    const cancel = () => {
      window.clearTimeout(awaitTimer);
      abort();
    };

    const trigger = () => {
      window.clearTimeout(awaitTimer);
      window.setTimeout(handler, awaitDelay);
    };

    return {
      cancel,
      trigger,
    };
  }, [preventBy]);

  useEffect(() => {
    const { cancel, trigger } = fetch();

    if (preventBy) {
      trigger();
    }

    return () => {
      cancel();
    };
  }, [preventBy]);

  const ready = Boolean(data);

  return preventBy ? (
    <React.Fragment>
      <Spinner in={!ready} />
      {ready ? (
        <CSSTransition type={transitionType} in={ready}>
          {children(data)}
        </CSSTransition>
      ) : null}
    </React.Fragment>
  ) : null;
}

Asynchronizer.defaultProps = {
  transitionType: "ZoomIn",
  preventBy: true,
} as Partial<Spec.Props<any>>;

export default Asynchronizer;
