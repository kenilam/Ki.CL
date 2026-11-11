import React from 'react';

import { Kicl_ImageAgentThreadsDocument, useQuery } from 'api/provider';

// Components
import { Animation, List, ListItem, Text } from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { NOTICE_ID } from '@/views/me/profile/constants';

/**
 * What deleting the account takes with it, as far as the page can tell: the
 * portfolio pieces the user can open and their image agent conversations.
 * When it knows of neither, it says so in one general line.
 */
const Notice: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { me } = useAccount();

  // One is enough to know there are any.
  const { data } = useQuery(Kicl_ImageAgentThreadsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { limit: 1 },
  });

  const portfolios = me?.portfolios.length ?? 0;
  const conversations = Boolean(data?.imageAgentThreads.length);

  if (!portfolios && !conversations) {
    return (
      <Animation delay={150} property='slide-from-top'>
        <Text id={NOTICE_ID} is='p'>
          {t('deletes', { context: 'everything' })}
        </Text>
      </Animation>
    );
  }

  return (
    <>
      <Animation delay={150} property='slide-from-top'>
        <Text dense id={NOTICE_ID} is='p'>
          {t('deletes', { context: 'list' })}
        </Text>
      </Animation>
      <Animation delay={150} property='slide-from-top'>
        <List gap='narrower' id={`${NOTICE_ID}-list`} is='ul'>
          <ListItem>{t('deletes', { context: 'account' })}</ListItem>
          {portfolios ? (
            <ListItem>
              {t('deletes', { context: 'portfolios', count: portfolios })}
            </ListItem>
          ) : null}
          {conversations ? (
            <ListItem>{t('deletes', { context: 'conversations' })}</ListItem>
          ) : null}
        </List>
      </Animation>
    </>
  );
};

export { Notice };
