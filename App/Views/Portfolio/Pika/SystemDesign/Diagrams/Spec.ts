export type Accent = 'blue' | 'green' | 'orange' | 'red' | 'yellow';

export type Group = {
  h: number;
  label: string;
  w: number;
  x: number;
  y: number;
};

/** One attribute line of an entity table. */
export type Row = {
  key?: string;
  name: string;
  note?: string;
  type: string;
};

export type Node = {
  h: number;
  /** Stable handle so a simulation can address this node. */
  id?: string;
  /** Secondary description lines under the title. */
  lines?: string[];
  /** Entity attribute rows - renders the node as a table. */
  rows?: Row[];
  shape?: 'cylinder' | 'queue' | 'rect';
  title: string;
  w: number;
  x: number;
  y: number;
};

export type Edge = {
  accent?: Accent;
  anchor?: 'end' | 'middle' | 'start';
  /** Draw an arrowhead at the start as well. */
  both?: boolean;
  dashed?: boolean;
  label?: string;
  lx?: number;
  ly?: number;
  /** Polyline waypoints; corners are rounded automatically. */
  points: Array<[number, number]>;
};

export type Spec = {
  /** Accessible description of what the diagram shows. */
  description: string;
  edges: Edge[];
  groups?: Group[];
  height: number;
  nodes: Node[];
  width: number;
};

export default {};
