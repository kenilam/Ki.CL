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
        animationDelay={1000}
        animationDuration='fastest'
        animationStyle='slide-from-bottom'
        className='kicl-font-size-large'
        stagger={0}
      >
        Glad you stopped by.
      </AnimatedText>
      <AnimatedText
        animationDelay={1600}
        animationDuration='fastest'
        animationStyle='slide-from-top'
        lookLike='h3'
        variant='secondary'
      >
        The journey's just beginning. Thanks for being here early.
      </AnimatedText>
      <AnimatedText
        animationDelay={2000}
        animationDuration='fastest'
        animationEasing='ease-quint-in-out'
        animationStyle='slide-from-bottom'
        dense
      >
        Please check back for an update soon.
      </AnimatedText>
    </>
  );
};

export default Contents;
