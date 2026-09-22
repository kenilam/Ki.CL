import React from 'react';
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { AnimatedText, Heading, HyperLink } from '@/components';

const Contents: React.FunctionComponent = () => {
  return (
    <>
      <Heading className={classNames('kicl-font-size-largest')} is='h1'>
        <HyperLink aria-label='Ki.CL home' lookLikeButton to='/' unstyled>
          <Icons.Logo />
        </HyperLink>
      </Heading>
      <AnimatedText
        delay={1000}
        duration='slower'
        easing='ease-sine-in'
        property='slide-from-bottom'
        className='kicl-font-size-large'
      >
        Thanks for stopping by.
      </AnimatedText>
      <AnimatedText
        delay={2000}
        duration='slower'
        easing='ease-sine-in'
        property='slide-from-bottom'
        dense
      >
        More soon.
      </AnimatedText>
    </>
  );
};

export { Contents };
