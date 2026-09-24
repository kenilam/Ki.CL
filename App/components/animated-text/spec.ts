import type { AnimationProps, TextProps } from '@/components';

type Children =
  Extract<TextProps['children'], string | number | null | undefined> | false;

export type Props = Omit<TextProps, 'children'> &
  Pick<AnimationProps, 'delay' | 'duration' | 'easing' | 'property'> & {
    /**
     * Milliseconds added per piece: `delay + stagger * index`.
     */
    stagger?: number;
    /**
     * Animate by letter or by word. Use `word` for sentences, where one
     * transition per letter is too many.
     */
    split?: 'letter' | 'word';
    /**
     * Only strings and numbers are split into characters.
     * Falsy values and `true` render nothing.
     */
    children?: Children;
  };
