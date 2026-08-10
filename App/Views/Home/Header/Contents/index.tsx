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
        duration='fastest'
        property='slide-from-bottom'
        className='kicl-font-size-large'
        stagger={0}
      >
        Glad you stopped by.
      </AnimatedText>
      <AnimatedText
        delay={1600}
        duration='fastest'
        property='slide-from-top'
        lookLike='h3'
        variant='secondary'
      >
        The journey's just beginning. Thanks for being here early.
      </AnimatedText>
      <AnimatedText
        delay={2000}
        duration='fastest'
        easing='ease-quint-in-out'
        property='slide-from-bottom'
        dense
      >
        Please check back for an update soon.
      </AnimatedText>
    </>
  );
};

export default Contents;
