import { createContext, useContext } from 'react';

export type DotState = 'done' | 'idle' | 'queued' | 'retry' | 'running';

export type PlayerStep = {
  active?: string[];
  /** Replaces the status chip, a whole line such as the credits held. */
  chip?: string;
  dot?: [number, DotState];
  failed?: string[];
  log: string;
};

type SimulationContextValue = {
  chip: string;
  dotLabels: string[];
  dots: DotState[];
  idleHint: string;
  seen: PlayerStep[];
};

const SimulationContext = createContext<SimulationContextValue>({
  chip: '',
  dotLabels: [],
  dots: [],
  idleHint: '',
  seen: [],
});

const useSimulation = () => useContext(SimulationContext);

export { SimulationContext, useSimulation };
