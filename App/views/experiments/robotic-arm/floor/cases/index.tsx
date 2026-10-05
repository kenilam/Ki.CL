import React from 'react';

// World
import { CATALOGUE, type World } from '@/views/experiments/robotic-arm/floor/world';

// Partials
import { Kind } from './kind';

const KINDS = [...new Set(CATALOGUE.map(({ kind }) => kind))];

/** Every case on the floor, one instanced mesh per kind, so hundreds cost a few draw calls. */
const Cases: React.FunctionComponent<{ world: World }> = ({ world }) => (
  <>
    {KINDS.map((kind) => (
      <Kind key={kind} kind={kind} world={world} />
    ))}
  </>
);

export { Cases };
