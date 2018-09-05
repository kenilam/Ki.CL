// @flow
import React from 'react';

import { TweenLite } from 'gsap';

import GraphicLayer from 'Component/GraphicLayer';

import Circle from './Circle';

import State, { Connector } from './State';

import './style.scss';

type windowSize = {
    height: String | Number,
    width: String | Number
};

type Props = {
    children: React.Node,
    windowResizeHandler: Function,
    windowSize: windowSize
};

const onResize = (windowResizeHandler, animationFrame) => {
    if (!windowResizeHandler) {
        return;
    }

    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(windowResizeHandler);
};

const Background = ({ children, windowResizeHandler, windowSize }: Props) => {
    const className = 'background';

    onResize(windowResizeHandler);

    return (
        <GraphicLayer {...{ className, ...windowSize }}>
            {React.Children.map(children, child =>
                React.cloneElement(child, { windowSize })
            )}
        </GraphicLayer>
    );
};

const Instance = Connector(Background);

const Component = props => (
    <State>
        <Instance {...props} />
    </State>
);

export { TweenLite, Circle };
export default Component;
