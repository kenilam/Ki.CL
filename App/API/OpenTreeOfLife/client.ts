// Libraries
import * as newick from 'newick-js';

const get = async () => {
  let data: ReturnType<typeof newick.parse> | undefined;
  let loading = true;
  let error: Error | undefined;

  try {
    const response = await window.fetch(
      'https://api.opentreeoflife.org/v3/taxonomy/subtree',
      {
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ott_id: 770315,
          format: 'newick',
        }),
        method: 'POST',
      }
    );

    const json = (await response.json()) as { newick: string };

    data = newick.parse(json.newick);
  } catch (_error) {
    error = new Error((_error as Error).message);
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

export { get };
