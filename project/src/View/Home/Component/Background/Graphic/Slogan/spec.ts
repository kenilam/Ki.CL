type Height = number;
type Width = number;
type X = number;
type Y = number;

export interface Style extends PIXI.TextStyle {
}

export interface UpdateProps {
  height: Height;
  width: Width;
  x: X;
  y: Y;
}
