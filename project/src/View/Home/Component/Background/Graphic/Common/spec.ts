export module RoundedRect {
  type Height = number;
  type Width = number;
  type Radius = number;
  type X = number;
  type Y = number;
  
  export interface UpdateProps {
    height: Height;
    radius: Radius;
    width: Width;
    x: X;
    y: Y;
  }
}
