import { CSSTransition, Spinner } from '@/Component';
import { CSSUnit, Fetch } from '@/Helper';
import React, { useCallback, useEffect, useState } from 'react';
import Style from './Style';
import Spec from './spec';

const awaitDelay = CSSUnit(Style.delay);

const DEFAULT_DATA: Spec.Data<null> = {
  success: false,
  result: null,
  error: false,
};

function Asynchronizer<T>({
  awaitFor,
  awaitForOptions,
  children,
  onError,
  onSuccess,
  preventFor,
  transitionType,
  ...rest
}: Spec.Props<T>) {
  let awaitTimer: number;

  const [data, updateData] = useState<Spec.Data<T>>(DEFAULT_DATA);

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
  }, [preventFor]);

  useEffect(() => {
    const { cancel, trigger } = fetch();

    if (preventFor) {
      trigger();
    }

    return () => {
      cancel();
    };
  }, [preventFor]);

  return preventFor ? (
    <>
      <Spinner in={!data.success} />
      <CSSTransition {...rest} type={transitionType} in={data.success}>
        {children(data)}
      </CSSTransition>
    </>
  ) : null;
}

Asynchronizer.defaultProps = {
  preventFor: true,
  transitionType: 'Fade',
} as Partial<Spec.Props<null>>;

export default Asynchronizer;
