type Alpha = number;
type Height = number;
type Width = number;
type X = number;
type Y = number;

type TextStyleNames = keyof PIXI.TextStyle;

export type TextStyles = {
  [name in TextStyleNames]: PIXI.TextStyle[TextStyleNames]
}

export interface Style extends Partial<TextStyles> {
  [name: string]: PIXI.TextStyle[TextStyleNames]
}

export interface UpdateProps {
  alpha?: Alpha;
  height: Height;
  width: Width;
  x: X;
  y: Y;
}
