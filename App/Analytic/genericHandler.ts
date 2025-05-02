import React from 'react';

import * as GA from './GA';
import * as Sentry from './Sentry';
import * as TagManager from './TagManager';

const environment = import.meta.env.DEV ? 'development' : 'production';

type Props = Pick<GA.EventArgs, 'action'> & Pick<Sentry.Event, 'level'>;

function genericHandler<
  EventHandler extends React.EventHandler<React.SyntheticEvent>,
>({ action, level }: Props) {
  function handler(event: Parameters<EventHandler>[number]) {
    if (!event.currentTarget) {
      return;
    }

    const labelFor = event.currentTarget.id
      ? document.querySelector<HTMLLabelElement>(
          `label[for='${event.currentTarget.id}']`
        )
      : null;

    const text =
      event.currentTarget.textContent ||
      (event.currentTarget as HTMLElement).innerText ||
      (event.currentTarget as HTMLElement).title ||
      (event.currentTarget as HTMLFormElement).value ||
      labelFor?.textContent ||
      labelFor?.innerText ||
      event.currentTarget.classList.toString();

    const label = [text, (event.currentTarget as HTMLElement).dataset.traceId]
      .filter(Boolean)
      .join(' - trace ID:');

    GA.event({
      category: event.currentTarget.nodeName,
      action,
      label,
    });

    Sentry.captureEvent({
      environment,
      level,
      message: label,
    });

    TagManager.ctaHandler({
      action,
      label,
    });
  }

  return handler;
}

export default genericHandler;
