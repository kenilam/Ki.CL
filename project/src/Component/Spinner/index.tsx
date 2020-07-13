import { Types } from '@/Component/CSSTransition';
import classnames from 'classnames';
import React from 'react';
import Style from './Style';
import { Props } from './spec';

const Spinner: React.FunctionComponent<Props> = ({
  withOverlay,
  ...props
}) => {
  const className = classnames({
    [Style.withoverlay]: withOverlay,
  });

  return (
    <Types.ZoomIn
      {...props}
      standalone={true}
    >
      <svg className={className} data-component={Style.default}>
        <circle cx='70%' cy='30%' r='30%' />
        <circle cx='70%' cy='70%' r='30%' />
        <text>Loading</text>
      </svg>
    </Types.ZoomIn>
  );
};

Spinner.defaultProps = {
  in: true,
} as Props;

export default Spinner;
