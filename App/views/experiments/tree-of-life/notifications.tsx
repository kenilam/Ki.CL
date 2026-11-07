import React, { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// API
import {
  Kicl_TaxonVisualUpdatedDocument,
  type Kicl_TaxonVisualUpdatedSubscriptionVariables,
  useSubscription,
} from 'api/provider';

// Routes
import { useLocation } from 'design/router';

// Components
import { Notification } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Partials
import { forget, settle, usePlates } from './plates';

// Constants
import { toPath } from './explorer/details/constants';

// Only a plate that is ready is announced. A failed one says why when its taxon is opened.
const Watch: React.FunctionComponent<
  Kicl_TaxonVisualUpdatedSubscriptionVariables
> = ({ ottId }) => {
  useSubscription(Kicl_TaxonVisualUpdatedDocument, {
    onData: ({ data: { data } }) => {
      const status = data?.taxonVisualUpdated.status;

      if (status === 'READY') {
        settle(ottId);
        return;
      }

      if (status !== 'PENDING') {
        forget(ottId);
      }
    },
    variables: { ottId },
  });

  return null;
};

const PlateWatches: React.FunctionComponent = () => {
  const plates = usePlates();

  return (
    <>
      {plates
        .filter(({ ready }) => !ready)
        .map(({ ottId }) => (
          <Watch key={ottId} ottId={ottId} />
        ))}
    </>
  );
};

function useTreeOfLifeNotifications() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const plates = usePlates();

  // The taxon whose details are open shows its own plate, so it isn't announced.
  const ready = plates.filter(({ ready }) => ready);
  const shown = ready.filter(({ nodeId }) => toPath(nodeId) !== pathname);
  const seen = ready.find(({ nodeId }) => toPath(nodeId) === pathname)?.ottId;

  useEffect(() => {
    if (seen === undefined) {
      return;
    }

    forget(seen);
  }, [seen]);

  const close = () => {
    shown.forEach(({ ottId }) => forget(ottId));
  };

  const notifications = shown.map(({ name, nodeId, ottId }) => (
    <Notification
      avatar={<Ri.RiImageLine aria-hidden />}
      key={ottId}
      onClear={() => forget(ottId)}
      onClick={() => forget(ottId)}
      title={name}
      to={toPath(nodeId)}
    >
      {t('plate_ready')}
    </Notification>
  ));

  return { close, finished: shown.length > 0, notifications };
}

export { PlateWatches, useTreeOfLifeNotifications };
