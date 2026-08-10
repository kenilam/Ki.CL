import React from 'react';

// Components
import { Animation, Text } from '@/Components';
import type { TextNode } from '@/Components/Text/Spec';

// Spec
import * as Spec from './Spec';

const AnimatedText = React.forwardRef<TextNode, Spec.Props>(
  (
    {
      delay = 0,
      duration = 'fastest',
      easing,
      property = 'slide-from-top',
      children,
      stagger = 10,
      ...props
    },
    ref
  ) => {
    if (!['string', 'number'].includes(typeof children)) {
      return null;
    }

    const text = String(children);

    return (
      /*
       * `is` arrives as the whole union, so TypeScript cannot pick the
       * matching branch of the polymorphic props through a spread. The
       * value is correct by construction; only the narrowing is lost.
       */
      <Text {...(props as React.ComponentProps<typeof Text>)} ref={ref}>
        {text.split('').map((letter, index) => {
          const key = `${index}`;

          return (
            <Animation
              delay={delay + stagger * index}
              duration={duration}
              easing={easing}
              property={property}
              key={key}
            >
              <Text is='span' unstyled>
                {letter}
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

export { type AnimatedTextProps };
export default AnimatedText;
