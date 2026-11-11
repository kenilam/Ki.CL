// API
import { Kicl_ImageAgentThreadsDocument, useQuery } from 'api/provider';

// Components
import { useWatch } from 'design/components';

// Context
import { useComposerContext } from '@/views/experiments/image-agent/composer';

// Constants
import { VARIABLES } from './constants';

/**
 * The person's conversations with no turn running, most recent first, that
 * contain every word in the field. Skips conversations with no message from
 * the person left in them, which happens when their only message was refused.
 * Reads what `Past` fetched, so an item mounting never fetches.
 */
function usePast() {
  const { form } = useComposerContext();
  const text = useWatch({ control: form.control, name: 'text' }) ?? '';
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const { data } = useQuery(Kicl_ImageAgentThreadsDocument, {
    variables: VARIABLES,
  });
  const threads = (data?.imageAgentThreads ?? []).filter((thread) => {
    if (thread.status !== 'IDLE') {
      return false;
    }

    if (
      !thread.messages.some(({ role }) => {
        return role === 'USER';
      })
    ) {
      return false;
    }

    const said = [
      thread.brief,
      ...thread.messages.map(({ text }) => {
        return text;
      }),
    ]
      .join(' ')
      .toLowerCase();

    return words.every((word) => {
      return said.includes(word);
    });
  });

  return { threads, words };
}

export { usePast };
