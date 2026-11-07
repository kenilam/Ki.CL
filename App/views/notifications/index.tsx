import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Notification, NotificationGroup } from 'design/components';

// Hooks
import { useNotifications } from './use-notifications';

const Notifications: React.FunctionComponent = () => {
  const { t } = useTranslation();
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
      {shown.map(({ id, look, message, title, to }) => {
        const onClear = look.running ? undefined : () => clear([id]);

        return (
          <Notification
            avatar={look.avatar}
            key={id}
            level={look.level}
            onClear={onClear}
            onClick={onClear}
            title={t(title.key as never, title.values)}
            to={to}
          >
            {t(message.key as never, message.values)}
          </Notification>
        );
      })}
    </NotificationGroup>
  );
};

export { Notifications };
