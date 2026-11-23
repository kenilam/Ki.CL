// API
import {
  Kicl_ImageAgentAllowanceDocument,
  Kicl_ImageAgentThreadUpdatedDocument,
  useSubscription,
} from 'api/client';

const useLive = (id: string) => {
  useSubscription(Kicl_ImageAgentThreadUpdatedDocument, {
    onData: ({ client, data: { data: pushed } }) => {
      if (pushed?.imageAgentThreadUpdated?.status !== 'IDLE') {
        return;
      }

      void client.refetchQueries({
        include: [Kicl_ImageAgentAllowanceDocument],
      });
    },
    variables: { id },
  });
};

export { useLive };
