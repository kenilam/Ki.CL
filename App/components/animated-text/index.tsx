import React from 'react';

// Components
import { Animation, Text } from '@/components';
import type { TextNode } from '@/components/text/spec';

// Spec
import * as Spec from './spec';

const AnimatedText = React.forwardRef<TextNode, Spec.Props>(
  (
    {
      delay = 0,
      duration = 'fastest',
      easing,
      property = 'slide-from-top',
      children,
      split = 'letter',
      stagger = 10,
      ...props
    },
    ref
  ) => {
    if (!['string', 'number'].includes(typeof children)) {
      return null;
    }

    const text = String(children);

    /*
     * Whitespace between words stays plain text, so the sentence wraps as it
     * would without the animation.
     */
    const pieces = split === 'word' ? text.split(/(\s+)/) : text.split('');

    return (
      /*
       * `is` arrives as the whole union, so TypeScript cannot pick the
       * matching branch of the polymorphic props through a spread. The
       * value is correct by construction; only the narrowing is lost.
       */
      <Text {...(props as React.ComponentProps<typeof Text>)} ref={ref}>
        {/* Read once as a word; the letters below are only for the eye. */}
        <span className='kicl-hidden'>{text}</span>
        {pieces.map((piece, index) => {
          const key = `${index}`;

          if (split === 'word' && /^\s*$/.test(piece)) {
            return piece;
          }

          return (
            <Animation
              delay={delay + stagger * (split === 'word' ? index / 2 : index)}
              duration={duration}
              easing={easing}
              property={property}
              key={key}
            >
              <Text aria-hidden is='span' unstyled>
                {piece}
              </Text>
            </Animation>
          );
        })}
      </Text>
    );
  }
);

AnimatedText.displayName = 'AnimatedText';

type AnimatedTextProps = Spec.Props;

export { AnimatedText, type AnimatedTextProps };
