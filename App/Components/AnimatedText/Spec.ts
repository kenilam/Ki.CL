import type { AnimationProps, TextProps } from '@/Components';

type Children =
  Extract<TextProps['children'], string | number | null | undefined> | false;

export type Props = Omit<TextProps, 'children'> &
  Pick<AnimationProps, 'delay' | 'duration' | 'easing' | 'property'> & {
    /**
     * Milliseconds added per character: `delay + stagger * index`.
     */
    stagger?: number;
    /**
     * Only strings and numbers are split into characters.
     * Falsy values and `true` render nothing.
     */
    children?: Children;
  };
