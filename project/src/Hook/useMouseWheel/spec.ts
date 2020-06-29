export type Type = 'UPDATE_MOUSE_WHEEL';

export interface Actions extends Types, State {}

export interface State {
  mouseWheel: Values;
}

export interface Types {
  type: Type;
}

export interface Values {
  x: number;
  y: number;
}
