import React from 'react';

// Components
import { Animation, Text } from '@/Components';
import type { TextNode } from '@/Components/Text/Spec';

// Spec
import * as Spec from './Spec';

const AnimatedText = React.forwardRef<TextNode, Spec.Props>(
  (
    {
      animationDelay = 0,
      animationDuration = 'fastest',
      animationEasing,
      animationStyle = 'slide-from-top',
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
              animationDelay={animationDelay + stagger * index}
              animationDuration={animationDuration}
              animationEasing={animationEasing}
              animationStyle={animationStyle}
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
