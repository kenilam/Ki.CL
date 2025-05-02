import React from 'react';
import classNames from 'classnames';

// Icons
import * as Icons from '@/Icons';

// Components
import { Heading, Text } from '@/Components';

const Contents: React.FunctionComponent = () => {
  return (
    <>
      <Heading className={classNames('kicl-font-size-largest')} is='h1'>
        <Icons.Logo />
      </Heading>
      <Text className='kicl-font-size-larger'>Glad you stopped by.</Text>
      <Text lookLike='h3'>
        The journey's just beginning. Thanks for being here early.
      </Text>
      <Text>Please check back for an update soon.</Text>
    </>
  );
};

export default Contents;
