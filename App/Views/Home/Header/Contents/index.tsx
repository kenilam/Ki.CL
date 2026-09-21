import React from 'react';
import classNames from 'classnames';

// Icons
import * as Icons from '@/Icons';

// Components
import { AnimatedText, Heading, HyperLink } from '@/Components';

const Contents: React.FunctionComponent = () => {
  return (
    <>
      <Heading className={classNames('kicl-font-size-largest')} is='h2'>
        <HyperLink lookLikeButton title='Ki.CL Home' to='/' unstyled>
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

export default Contents;
