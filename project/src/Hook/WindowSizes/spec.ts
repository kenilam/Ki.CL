declare namespace IWindowSizes {
  type Type = 'UPDATE_WINDOW_SIZES' | 'UPDATE_WINDOW';
  
  interface Actions extends Types, State {
  }
  
  interface State {
    windowSizes: Values
  }
  
  interface Types {
    type: Type
  }
  
  interface Values {
    height: number,
    width: number,
  }
}
