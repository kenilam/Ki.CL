import React, {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

// API
import {
  Kicl_TaxonSearchDocument,
  useLazyQuery,
  type Kicl_TaxonSearchQuery,
} from 'api/provider';

// Components
import { Card, CardContent, Input, Layout, Text } from '@/Components';

// Router
import { useNavigate } from '@/Router';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Constants
import { toPath } from '@/Views/Experiments/TreeOfLife/constants';

// Labels
import {
  drawnTaxa,
  drawnVersion,
  subscribeDrawn,
} from '@/Views/Experiments/TreeOfLife/v15/labels';

/**
 * Find a taxon by name.
 *
 * A native `datalist`, so the dropdown is the browser's own combobox: it is
 * keyboard-navigable, announced correctly, filters as you type and behaves the
 * way the platform does everywhere else. Nothing here reimplements a listbox.
 *
 * v14 searched a list the client already held, which could only ever offer what
 * was on screen. This asks the server once there is something to ask about —
 * stored nodes answer first, and a name nobody has visited falls through to
 * Open Tree's own index — while an empty field falls back to what *is* on
 * screen, so the dropdown is useful before you have typed anything.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';
const LIST_ID = `${CLASS_NAME}--taxa`;

/**
 * How long typing has to pause before a search is sent.
 *
 * Every keystroke would otherwise be a round trip, and on the fallback path
 * that is a request to a third party. Long enough to cover ordinary typing,
 * short enough not to feel held back.
 */
const DEBOUNCE_MS = 250;

/** Below this the server rejects the query, so there is no point sending it. */
const MIN_LENGTH = 2;

type Result = Kicl_TaxonSearchQuery['TaxonSearch'][number];

/** What the dropdown offers: a name to show and the node it leads to. */
type Option = {
  nodeId: string;
  name: string;
  detail: string;
};

const Search: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { find } = useTreeOfLifeContext();
  const [query, setQuery] = useState('');
  const [search, { data, loading }] = useLazyQuery(Kicl_TaxonSearchDocument);

  useEffect(() => {
    const trimmed = query.trim();

    /*
     * Clearing the field clears the field and nothing else — it does not
     * navigate, and it does not reset the view. That was the one behaviour v14
     * got wrong, where emptying the box threw away what you were looking at.
     */
    if (trimmed.length < MIN_LENGTH) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      search({ variables: { query: trimmed, limit: 8 } });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, search]);

  /*
   * The set of drawn taxa changes as the tree does, so it is subscribed to
   * rather than read once. The version is the snapshot — `drawnTaxa` builds a
   * fresh array each call and would never compare equal.
   */
  const version = useSyncExternalStore(
    subscribeDrawn,
    drawnVersion,
    drawnVersion
  );

  const onScreen: Option[] = useMemo(
    () =>
      drawnTaxa()
        .map((nodeId) => {
          const taxon = find(nodeId);

          return taxon?.name
            ? { nodeId, name: taxon.name, detail: taxon.rank ?? '' }
            : null;
        })
        .filter((option): option is Option => option !== null)
        .sort((a, b) => a.name.localeCompare(b.name)),
    // `find` reads the cache, and `version` is what says the cache moved.
    [version, find]
  );

  const found: Option[] = (data?.TaxonSearch ?? [])
    .filter((result: Result) => Boolean(result.nodeId))
    .map((result: Result) => ({
      nodeId: result.nodeId as string,
      name: result.name,
      // An Open Tree match has no rank until its subtree is fetched, so the
      // absence is the useful thing to say.
      detail: result.rank ?? 'not yet visited',
    }));

  /*
   * Searched names when there are any, otherwise whatever is already drawn.
   * An empty field is the common case on arrival, and offering the tree you are
   * looking at is more useful than offering nothing.
   */
  const options = found.length > 0 ? found : onScreen;

  /*
   * A `datalist` fills the input with the chosen value; it does not tell you
   * something was chosen. Matching the value back to an option is what turns
   * that into navigation — and it is why the option values have to be unique,
   * which the rank suffix takes care of for taxa that share a name.
   */
  const choose = (value: string) => {
    setQuery(value);

    const picked = options.find((option) => label(option) === value);

    if (picked) {
      navigate(toPath(picked.nodeId));
    }
  };

  return (
    <Card is='aside' className={`${CLASS_NAME}__panel kicl-inline-size-xxl`}>
      <CardContent>
        <Layout autoFlow='row' gap='narrow'>
          <div>
            <Input
              type='search'
              value={query}
              list={LIST_ID}
              placeholder='Find a taxon…'
              autoComplete='off'
              aria-label='Find a taxon by name'
              onChange={(event) => choose(event.target.value)}
            />

            <datalist id={LIST_ID}>
              {options.map((option) => (
                <option key={option.nodeId} value={label(option)} />
              ))}
            </datalist>

            <Text
              dense
              is='p'
              className={`kicl-font-size-smaller ${CLASS_NAME}__muted`}
            >
              {loading
                ? 'Searching…'
                : `${options.length} ${
                    found.length > 0 ? 'matching' : 'on screen'
                  }`}
            </Text>
          </div>
        </Layout>
      </CardContent>
    </Card>
  );
};

/** Two taxa can share a name, so the rank is what keeps an option unique. */
function label(option: Option): string {
  return option.detail ? `${option.name} · ${option.detail}` : option.name;
}

export default Search;
