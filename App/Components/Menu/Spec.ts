type Orientation = 'horizontal' | 'vertical';

export type Props = React.MenuHTMLAttributes<HTMLMenuElement> & {
  orientation?: Orientation;
  dense?: boolean;
};
