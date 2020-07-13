export type Type = 'UPDATE_WINDOW_SIZES' | 'UPDATE_WINDOW';

export interface Actions extends Types, State {}

export interface State {
  windowSizes: Values;
}

export interface Types {
  type: Type;
}

export interface Values {
  height: number;
  width: number;
}
