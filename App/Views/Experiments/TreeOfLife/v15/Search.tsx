import React, { useEffect, useState } from 'react';

// API
import {
  Kicl_TaxonSearchDocument,
  useLazyQuery,
  type Kicl_TaxonSearchQuery,
} from 'api/provider';

// Components
import { Badge, Card, CardContent, Input, Layout, Text } from '@/Components';

// Router
import { useNavigate } from '@/Router';

// Constants
import { toPath } from '@/Views/Experiments/TreeOfLife/constants';

/**
 * Find a taxon by name.
 *
 * v14 searched a list the client already held, which could only ever offer
 * what was on screen. This asks the server instead, so the whole of Open Tree
 * is reachable: stored nodes answer first, and a name nobody has visited falls
 * through to Open Tree's own index. Either way a result carries a node id, so
 * picking one navigates the same regardless of where it came from.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

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

const Search: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [find, { data, loading }] = useLazyQuery(Kicl_TaxonSearchDocument);

  useEffect(() => {
    const trimmed = query.trim();

    /*
     * Clearing the field clears the field and nothing else — it does not
     * navigate, and it does not reset the view. That was the one behaviour
     * v14 got wrong, where emptying the box threw away what you were looking
     * at.
     */
    if (trimmed.length < MIN_LENGTH) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      find({ variables: { query: trimmed, limit: 8 } });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, find]);

  const results: readonly Result[] = data?.TaxonSearch ?? [];

  return (
    <Card is='aside' className={`${CLASS_NAME}__panel kicl-inline-size-xxl`}>
      <CardContent>
        <Layout autoFlow='row' gap='narrow'>
          <div>
            <Input
              type='search'
              value={query}
              placeholder='Find a taxon…'
              autoComplete='off'
              aria-label='Find a taxon by name'
              onChange={(event) => setQuery(event.target.value)}
            />

            {results.length > 0 ? (
              <Layout autoFlow='row' gap='narrowest'>
                <div>
                  {results.map((result) => (
                    <Text
                      key={result.nodeId ?? result.name}
                      is='span'
                      unstyled
                      className={`${CLASS_NAME}__result`}
                      role='button'
                      tabIndex={0}
                      onClick={() =>
                        result.nodeId && navigate(toPath(result.nodeId))
                      }
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && result.nodeId) {
                          navigate(toPath(result.nodeId));
                        }
                      }}
                    >
                      {result.name}

                      {result.rank ? (
                        <Text
                          is='span'
                          dense
                          unstyled
                          className={`kicl-font-size-smaller ${CLASS_NAME}__muted`}
                        >
                          {result.rank}
                        </Text>
                      ) : null}

                      {/*
                        Only flagged when it came from Open Tree — a stored
                        result is the unremarkable case and needs no badge.
                      */}
                      {result.source === 'OPEN_TREE' ? (
                        <Badge size='small' variant='outline'>
                          new
                        </Badge>
                      ) : null}
                    </Text>
                  ))}
                </div>
              </Layout>
            ) : null}

            {loading || query.trim().length >= MIN_LENGTH ? (
              <Text
                dense
                is='p'
                className={`kicl-font-size-smaller ${CLASS_NAME}__muted`}
              >
                {loading
                  ? 'Searching…'
                  : `${results.length} ${results.length === 1 ? 'match' : 'matches'}`}
              </Text>
            ) : null}
          </div>
        </Layout>
      </CardContent>
    </Card>
  );
};

export default Search;
