// @flow
import React from 'react';

import { TweenLite } from 'gsap';

import { GraphicLayer } from 'Component';

import State, { Connector } from './State';

import './style.scss';

const Component = ({ children, updateWindowSize, windowSize }) => {
    const className = 'background';

    const Component = children;

    let animationFrame;

    window.addEventListener('resize', () => {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(updateWindowSize);
    });

    return (
        <GraphicLayer {...{ className, ...windowSize }}>
            <Component {...windowSize} />
        </GraphicLayer>
    );
};

const Instance = Connector(Component);

const Background = props => (
    <State>
        <Instance {...props} />
    </State>
);

export { TweenLite };
export default Background;
