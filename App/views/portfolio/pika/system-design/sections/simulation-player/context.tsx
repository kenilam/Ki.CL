import { createContext, useContext } from 'react';

export type DotState = 'done' | 'idle' | 'queued' | 'retry' | 'running';

export type PlayerStep = {
  active?: string[];
  /** Replaces the free-form status chip (e.g. credits, budget). */
  chip?: string;
  dot?: [number, DotState];
  failed?: string[];
  log: string;
};

type SimulationContextValue = {
  chip: string;
  chipLabel: string;
  dotLabels: string[];
  dots: DotState[];
  idleHint: string;
  seen: PlayerStep[];
};

const SimulationContext = createContext<SimulationContextValue>({
  chip: '',
  chipLabel: '',
  dotLabels: [],
  dots: [],
  idleHint: '',
  seen: [],
});

const useSimulation = () => useContext(SimulationContext);

export { SimulationContext, useSimulation };
