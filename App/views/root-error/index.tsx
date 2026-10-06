import React from 'react';

// Libraries
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

// Components
import { Animation, Text } from 'design/components';

/**
 * The error a form sets on its root, which is where the API's answer to a
 * submit goes. Renders nothing until there is one.
 */
const RootError: React.FunctionComponent = () => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!errors.root?.message) {
    return null;
  }

  return (
    <Animation property='slide-from-top'>
      <Text
        className={classNames('kicl-font-size-small', 'kicl-color-error')}
        is='p'
        role='alert'
      >
        {errors.root.message}
      </Text>
    </Animation>
  );
};

export { RootError };
