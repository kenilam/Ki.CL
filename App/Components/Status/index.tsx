import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Heading, Layout, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--status';

const TITLES: Spec.Titles = {
  error: 'Oops, Something wrong!',
  info: 'Did you know?',
  warning: 'Warning',
};

const LEVELS: Spec.Icons = {
  error: <Ri.RiErrorWarningLine className='kicl-font-size' />,
  info: <Ri.RiInformationLine className='kicl-font-size' />,
  warning: <Ri.RiAlarmWarningLine className='kicl-font-size' />,
};

const Status: React.FunctionComponent<Spec.Props> = ({
  align = 'start',
  animationStyle = 'slide-from-bottom',
  className: _className,
  in: transitionIn,
  level,
  message,
  title,
  ...rest
}) => {
  const className = classNames(
    CLASS_NAME,
    {
      [`kicl-color-${level}`]: level,
      [`kicl-text-align-${align}`]: align,
    },
    _className
  );

  let Icon = <></>;

  if (level) {
    Icon = LEVELS[level];
  }

  let heading = title;

  if (!title && level) {
    heading = TITLES[level];
  }

  const Title = <Text is='span'>{heading || TITLES.error}</Text>;

  const Messages = message ? (
    <Text className='kicl-font-size-small kicl-color-white' is='p'>
      {message}
    </Text>
  ) : null;

  return (
    <Animation {...rest} animationStyle={animationStyle} in={transitionIn}>
      <Layout
        alignContent={align}
        alignItems='center'
        autoFlow='row'
        gap='none'
        justifyContent='center'
        justifyItems='center'
      >
        <div className={className}>
          <Layout
            alignContent='center'
            alignItems='center'
            autoFlow='column'
            gap='narrow'
            justifyContent={align}
            justifyItems={align}
          >
            <Heading is='h4'>
              {Icon}
              {Title}
            </Heading>
          </Layout>
          {Messages}
        </div>
      </Layout>
    </Animation>
  );
};

type StatusProps = Spec.Props;

export { type StatusProps };
export default Status;
