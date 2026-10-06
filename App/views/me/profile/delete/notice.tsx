import React from 'react';

import { Kicl_ImageAgentThreadsDocument, useQuery } from 'api/provider';

// Components
import { Animation, List, ListItem, Text } from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Constants
import { COPY } from '@/views/me/profile/constants';

type Props = {
  /** For the dialog's description. The list, when there is one, is `${id}-list`. */
  id: string;
};

/**
 * What deleting the account takes with it, as far as the page can tell: the
 * portfolio pieces the user can open and their image agent conversations.
 * When it knows of neither, it says so in one general line.
 */
const Notice: React.FunctionComponent<Props> = ({ id }) => {
  const { me } = useAccount();

  // One is enough to know there are any.
  const { data } = useQuery(Kicl_ImageAgentThreadsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { limit: 1 },
  });

  const portfolios = me?.Portfolios.length ?? 0;
  const conversations = Boolean(data?.ImageAgentThreads.length);

  if (!portfolios && !conversations) {
    return (
      <Animation delay={150} property='slide-from-top'>
        <Text id={id} is='p'>
          {COPY.deletesEverything}
        </Text>
      </Animation>
    );
  }

  return (
    <>
      <Animation delay={150} property='slide-from-top'>
        <Text dense id={id} is='p'>
          {COPY.deletes}
        </Text>
      </Animation>
      <Animation delay={150} property='slide-from-top'>
        <List gap='narrower' id={`${id}-list`} is='ul'>
          <ListItem>{COPY.deletesAccount}</ListItem>
          {portfolios ? (
            <ListItem>{COPY.deletesPortfolios(portfolios)}</ListItem>
          ) : null}
          {conversations ? (
            <ListItem>{COPY.deletesConversations}</ListItem>
          ) : null}
        </List>
      </Animation>
    </>
  );
};

export { Notice };
