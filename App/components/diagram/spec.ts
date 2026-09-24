import type { ReactNode } from 'react';
import type { IconType } from '@/icons';
import type { TextAccent } from '@/components/text/spec';

export type Accent = 'blue' | 'green' | 'orange' | 'red' | 'yellow';

/** One legend chip: `label` is the colour or line style, `value` what it means. */
export type LegendItem = {
  accent?: TextAccent;
  label: string;
  value: string;
};

export type Group = {
  h: number;
  label: string;
  w: number;
  x: number;
  y: number;
};

/** One attribute line of an entity table. */
export type Row = {
  /** Drawn in place of `type`, before the name. */
  icon?: IconType;
  key?: string;
  name: string;
  note?: string;
  type?: string;
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
  /** Shown under the diagram, for how to read it. */
  caption?: ReactNode;
  /** Chips under the diagram for what its colours and line styles mean. */
  legend?: LegendItem[];
  /** Accessible description of what the diagram shows. */
  description: string;
  edges: Edge[];
  groups?: Group[];
  height: number;
  nodes: Node[];
  /** Short name, used for the open button and the full-size dialog. */
  title: string;
  width: number;
};
