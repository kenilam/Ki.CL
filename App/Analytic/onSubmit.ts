import React from 'react';

import genericHandler from './genericHandler';

type EventHandler = React.FormEventHandler<HTMLFormElement>;

const onSubmit = genericHandler<EventHandler>({
  action: 'Submit',
  level: 'info',
});

export default onSubmit;
