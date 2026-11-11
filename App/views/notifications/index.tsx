import React from 'react';

// Components
import { NotificationGroup } from 'design/components';

// Hooks
import { useNotifications } from './use-notifications';

// Partials
import { Notification } from './notification';

const Notifications: React.FunctionComponent = () => {
  const { clear, ended, shown } = useNotifications();

  if (!ended.length) {
    return null;
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      return;
    }

    clear(ended.map(({ id }) => id));
  };

  return (
    <NotificationGroup
      defaultOpen
      onOpenChange={onOpenChange}
      side='block-start'
    >
      {shown.map(({ id }) => {
        return <Notification id={id} key={id} />;
      })}
    </NotificationGroup>
  );
};

export { Notifications };
