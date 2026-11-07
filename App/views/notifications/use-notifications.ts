import { useEffect } from 'react';

// API
import {
  Kicl_NotificationsDismissDocument,
  Kicl_NotificationsDocument,
  Kicl_NotificationUpdatedDocument,
  useMutation,
  useQuery,
  useSubscription,
} from 'api/provider';

// Routes
import { useLocation } from 'design/router';

// Constants
import { RECORD_PATHS } from '@/views/routes';
import { LOOKS } from './constants';

function useNotifications() {
  const { pathname } = useLocation();
  const { data } = useQuery(Kicl_NotificationsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const [dismiss] = useMutation(Kicl_NotificationsDismissDocument, {
    refetchQueries: [Kicl_NotificationsDocument],
  });

  const notifications = (data?.notifications ?? [])
    .filter(({ dismissedAt }) => !dismissedAt)
    .map((notification) => {
      const { key, values } = notification.message;

      return {
        ...notification,
        look: LOOKS[`${key}_${values.context}`] ?? LOOKS[key] ?? {},
        to: RECORD_PATHS[notification.collection]?.(notification.documentId),
      };
    });

  useSubscription(Kicl_NotificationUpdatedDocument, {
    onData: ({ client, data: { data: pushed } }) => {
      const updated = pushed?.notificationUpdated;

      if (!updated) {
        return;
      }

      client.cache.updateQuery(
        { query: Kicl_NotificationsDocument },
        (cached) => {
          if (
            !cached ||
            cached.notifications.some(({ id }) => id === updated.id)
          ) {
            return cached;
          }

          return { notifications: [updated, ...cached.notifications] };
        }
      );
    },
    skip: !notifications.some(({ look }) => look.running),
  });

  const seen = notifications
    .filter(({ look, to }) => to === pathname && !look.running)
    .map(({ id }) => id)
    .join(',');

  useEffect(() => {
    if (!seen) {
      return;
    }

    void dismiss({ variables: { ids: seen.split(',') } });
  }, [dismiss, seen]);

  const shown = notifications.filter(({ to }) => to !== pathname);
  const ended = shown.filter(({ look }) => !look.running);

  const clear = (ids: string[]) => {
    void dismiss({ variables: { ids } });
  };

  return { clear, ended, shown };
}

export { useNotifications };
