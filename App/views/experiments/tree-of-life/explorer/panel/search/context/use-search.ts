import { useEffect, useState } from 'react';

// API
import {
  Kicl_TaxonSearchDocument,
  useLazyQuery,
  type Kicl_TaxonSearchQuery,
} from 'api/provider';

// Router
import { useNavigate } from 'design/router';

// Constants
import { toPath } from '@/views/experiments/tree-of-life/constants';
import {
  DEBOUNCE_MS,
  MIN_LENGTH,
  type Option,
  label,
} from '@/views/experiments/tree-of-life/explorer/panel/search/constants';

// Hooks
import { useTranslation } from 'design/hooks';
import { useOnScreen } from './use-on-screen';

type Result = Kicl_TaxonSearchQuery['taxonSearch'][number];

/**
 * Asks the server once there is something to ask about, and falls back to
 * what is on screen when the field is empty or nothing matches.
 */
const useSearch = () => {
  const { t } = useTranslation('tree-of-life');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [search, { data, loading }] = useLazyQuery(Kicl_TaxonSearchDocument);
  const onScreen = useOnScreen();

  useEffect(() => {
    const trimmed = query.trim();

    // Clearing the field doesn't navigate or reset the view.
    if (trimmed.length < MIN_LENGTH) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      search({ variables: { query: trimmed, limit: 8 } });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, search]);

  // The last response outlives the query that asked for it.
  const searching = query.trim().length >= MIN_LENGTH;

  const found: Option[] = (searching ? (data?.taxonSearch ?? []) : [])
    .filter((result: Result) => Boolean(result.nodeId))
    .map((result: Result) => ({
      nodeId: result.nodeId as string,
      name: result.name,
      // An Open Tree match has no rank until its subtree is fetched.
      detail: result.rank ?? t('not_visited'),
    }));

  const options = found.length > 0 ? found : onScreen;

  // A `datalist` only fills the field, so the value is matched back to an option.
  const choose = (value: string) => {
    setQuery(value);

    const picked = options.find((option) => label(option) === value);

    if (picked) {
      navigate(toPath(picked.nodeId));
    }
  };

  return { choose, found, loading, options, query, searching };
};

export { useSearch };
