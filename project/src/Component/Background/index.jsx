// @flow
import React from 'react';

import GraphicLayer from 'Component/GraphicLayer';

import Circle from './Circle';

import State, { Connector } from './State';

import './style.scss';

type backgroundSize = {
    height: string | number,
    width: string | number
};

type Props = {
    backgroundSize: backgroundSize,
    children: React.Node,
    updateBackgroundSize: Function
};

class Background extends React.Component<Props> {
    componentDidMount() {
        const { updateBackgroundSize } = this.props;

        window.addEventListener('resize', updateBackgroundSize, false);
    }

    componentWillUnmount() {
        const { updateBackgroundSize } = this.props;

        window.removeEventListener('resize', updateBackgroundSize, false);
    }

    render() {
        const { backgroundSize, children } = this.props;

        return (
            <GraphicLayer {...{ className: 'background', ...backgroundSize }}>
                {children}
            </GraphicLayer>
        );
    }
}

const Instance = Connector(Background);

const Component = props => (
    <State>
        <Instance {...props} />
    </State>
);

export { Circle };
export default Component;
