import React from 'react';

// Components
import { NotificationGroup } from 'design/components';

// Partials
import { useImageAgentNotifications } from '@/views/experiments/image-agent/notifications';
import { useKineticLightNotifications } from '@/views/experiments/kinetic-light/notifications';
import {
  PlateWatches,
  useTreeOfLifeNotifications,
} from '@/views/experiments/tree-of-life/notifications';
import { usePasswordChangeNotifications } from '@/views/me/password/notifications';

/**
 * Work that carries on after its page is left. The group opens once one of
 * them has finished, with the ones still running beside it, and closing it
 * clears every finished one.
 */
const Notifications: React.FunctionComponent = () => {
  const sources = [
    useImageAgentNotifications(),
    useKineticLightNotifications(),
    usePasswordChangeNotifications(),
    useTreeOfLifeNotifications(),
  ];

  const onOpenChange = (open: boolean) => {
    if (open) {
      return;
    }

    sources.forEach(({ close }) => close());
  };

  return (
    <>
      <PlateWatches />
      {sources.some(({ finished }) => finished) ? (
        <NotificationGroup
          defaultOpen
          onOpenChange={onOpenChange}
          side='block-start'
        >
          {sources.flatMap(({ notifications }) => notifications)}
        </NotificationGroup>
      ) : null}
    </>
  );
};

export { Notifications };
