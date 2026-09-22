import React from 'react';

// Libraries
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

// Components
import { Text } from '@/components';

// Schema
import type { SignInValues } from './schema';

/** The mutation's error, set on the form root by the parent. */
const RootError: React.FunctionComponent = () => {
  const {
    formState: { errors },
  } = useFormContext<SignInValues>();

  if (!errors.root?.message) {
    return null;
  }

  return (
    <Text
      className={classNames('kicl-font-size-smaller', 'kicl-color-error')}
      is='p'
      role='alert'
    >
      {errors.root.message}
    </Text>
  );
};

export { RootError };
