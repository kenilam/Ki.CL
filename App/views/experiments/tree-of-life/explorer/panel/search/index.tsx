import React from 'react';

// Components
import { Layout } from 'design/components';

// Partials
import { Provider } from './context';
import { Field } from './field';
import { Options } from './options';
import { Status } from './status';

/**
 * Find a taxon by name. A native `datalist`, so the dropdown is the browser's
 * own combobox.
 */
const Search: React.FunctionComponent = () => {
  return (
    <Layout gap='narrow'>
      <search>
        <Provider>
          <Field />
          <Options />
          <Status />
        </Provider>
      </search>
    </Layout>
  );
};

export { Search };
