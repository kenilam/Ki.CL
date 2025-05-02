import React from 'react';

import genericHandler from './genericHandler';

type EventHandler = React.FocusEventHandler<
  HTMLAnchorElement | HTMLButtonElement | HTMLInputElement | HTMLSelectElement
>;

const onFocus = genericHandler<EventHandler>({
  action: 'Click',
  level: 'info',
});

export default onFocus;
