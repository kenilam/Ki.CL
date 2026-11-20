import React from 'react';

// Components
import { Layout } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Partials
import { Note } from './note';

// Constants
import { NOTES } from '@/views/experiments/swatch/card/article/constants';

const FILLS = {
  true: 12,
  false: 4,
} as const;

const Notes: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();

  return (
    <Layout fill={FILLS[String(isNarrow)]} gap='wide'>
      <div>
        {NOTES.map((note) => {
          return <Note key={note} note={note} />;
        })}
      </div>
    </Layout>
  );
};

export { Notes };
