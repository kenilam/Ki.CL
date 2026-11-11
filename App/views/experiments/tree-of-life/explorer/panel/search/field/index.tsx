import React from 'react';

// Components
import { SearchInput } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSearchContext } from '@/views/experiments/tree-of-life/explorer/panel/search/context';

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/constants';
import { LIST_ID } from '@/views/experiments/tree-of-life/explorer/panel/search/constants';

// The stylesheet hides the picker triangle the browser draws on a `list` input.
const Field: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { choose, loading, query } = useSearchContext();

  return (
    <SearchInput
      className={`${CLASS_NAME}__search`}
      value={query}
      list={LIST_ID}
      placeholder={t('search_placeholder')}
      autoComplete='off'
      aria-label={t('search_label')}
      aria-busy={loading}
      onChange={(event) => {
        choose(event.target.value);
      }}
    />
  );
};

export { Field };
