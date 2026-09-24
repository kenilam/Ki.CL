import type { ReactElement } from 'react';

export type Props = {
  /** The one element to frame. It keeps its own tag and props. */
  children: ReactElement<{ className?: string; style?: React.CSSProperties }>;
  className?: string;
  /** Ease in from full-bleed to the frame. On unless turned off. */
  animate?: boolean;
  /**
   * Clip what bleeds past the frame. Turn it off when the children crop
   * themselves and something, such as text, should pass the edge.
   */
  clip?: boolean;
  /** Milliseconds to wait before easing in. */
  delay?: number;
  /** A minimum height instead of a fixed one, for content taller than the window. */
  grow?: boolean;
  /**
   * For a frame at the top of the page: it holds still while the header hides
   * and the frame grows into its space, then scrolls.
   */
  hold?: boolean;
};
