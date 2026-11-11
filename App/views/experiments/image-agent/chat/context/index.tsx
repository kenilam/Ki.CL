import React, { PropsWithChildren } from 'react';

// Partials
import { Provider as Busy } from './busy';
import { Provider as Choosing, useChoosingContext } from './choosing';
import { Provider as Composer } from './composer';
import { Provider as Fresh, useFreshContext } from './fresh';
import { Provider as Sender, useSenderContext } from './sender';
import { Provider as Thread, useThreadContext } from './thread';

/** The conversation the URL names, and what the person can do in it. */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Thread>
      <Sender>
        <Busy>
          <Fresh>
            <Choosing>
              <Composer>{children}</Composer>
            </Choosing>
          </Fresh>
        </Busy>
      </Sender>
    </Thread>
  );
};

export {
  Provider,
  useChoosingContext,
  useFreshContext,
  useSenderContext,
  useThreadContext,
};
