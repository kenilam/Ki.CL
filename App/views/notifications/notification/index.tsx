import React from 'react';

// API
import {
  Kicl_NotificationsDismissDocument,
  Kicl_NotificationsDocument,
  useMutation,
  useQuery,
  type Kicl_NotificationsQuery,
} from 'api/provider';

// Components
import { Notification as Origin } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { RECORD_PATHS } from '@/views/routes';
import { lookOf } from '@/views/notifications/constants';

type Props = Pick<Kicl_NotificationsQuery['notifications'][number], 'id'>;

const Notification: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { data } = useQuery(Kicl_NotificationsDocument);
  const [dismiss] = useMutation(Kicl_NotificationsDismissDocument, {
    refetchQueries: [Kicl_NotificationsDocument],
  });
  const notification = data?.notifications.find((each) => {
    return each.id === id;
  });

  if (!notification) {
    return null;
  }

  const { collection, documentId, message, title } = notification;
  const look = lookOf(message);
  const onClear = look.running
    ? undefined
    : () => {
        void dismiss({ variables: { ids: [id] } });
      };

  return (
    <Origin
      avatar={look.avatar}
      level={look.level}
      onClear={onClear}
      onClick={onClear}
      title={t(title.key as never, title.values)}
      to={RECORD_PATHS[collection]?.(documentId)}
    >
      {t(message.key as never, message.values)}
    </Origin>
  );
};

export { Notification };
