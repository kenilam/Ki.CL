import React from 'react';

import genericHandler from './genericHandler';

type EventHandler = React.MouseEventHandler<
  HTMLAnchorElement | HTMLButtonElement | HTMLInputElement
>;

const onClick = genericHandler<EventHandler>({
  action: 'Click',
  level: 'info',
});

export default onClick;
