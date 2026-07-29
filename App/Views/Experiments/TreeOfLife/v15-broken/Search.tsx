import React, { useState } from 'react';

import { Card, CardContent, Input, Text } from '@/Components';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

type Props = {
  namedNodes: ReadonlyArray<{ id: string; label: string }>;
  onSelect: (nodeId: string) => void;
};

/**
 * v14's search card, minus its react-hook-form wiring — v15 has no form
 * state to share, and per spec clearing the field must not touch the route
 * or reset the visualisation, so the text lives in plain local state and
 * only an actual match navigates.
 */
const Search: React.FunctionComponent<Props> = ({ namedNodes, onSelect }) => {
  const [query, setQuery] = useState('');
  const listId = `${CLASS_NAME}-search-list`;

  const onChange = (value: string) => {
    setQuery(value);

    const trimmed = value.trim();
    if (!trimmed) {
      // Clearing only clears the field — never navigates, never resets.
      return;
    }

    const match = namedNodes.find(
      (item) => item.label.toLowerCase() === trimmed.toLowerCase()
    );
    if (match) {
      onSelect(match.id);
    }
  };

  return (
    <Card is='aside' className={`${CLASS_NAME}__panel kicl-inline-size-xxl`}>
      <CardContent>
        <Text
          is='span'
          className='kicl-font-size-small kicl-color-grey-dark kicl-font-weight-bold'
        >
          Search
        </Text>
        <Input
          type='search'
          value={query}
          list={listId}
          placeholder='Find a named node…'
          autoComplete='off'
          onChange={(event) => onChange(event.target.value)}
        />
        <datalist id={listId}>
          {namedNodes.map((item) => (
            <option key={item.id} value={item.label} />
          ))}
        </datalist>
        <Text
          dense
          is='p'
          className='kicl-font-size-smaller kicl-color-grey-dark'
        >
          {namedNodes.length} in total
        </Text>
      </CardContent>
    </Card>
  );
};

export default Search;
