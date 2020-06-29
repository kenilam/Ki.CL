export type Type = 'UPDATE_WINDOW_SCROLL';

export interface Actions extends Types, State {}

export interface State {
  windowScroll: Values;
}

export interface Types {
  type: Type;
}

export interface Values {
  x: number;
  y: number;
}
