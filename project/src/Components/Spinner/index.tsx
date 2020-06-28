import { Types } from '@/Components/CSSTransition';
import classnames from 'classnames';
import React from 'react';
import Style from './Style';
import Spec from './spec';

const Spinner: React.FunctionComponent<Spec.Props> = ({
  withOverlay,
  ...props
}) => {
  const className = classnames({
    [Style.withoverlay]: withOverlay,
  });

  return (
    <Types.ZoomIn {...props}>
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
} as Spec.Props;

export default Spinner;
