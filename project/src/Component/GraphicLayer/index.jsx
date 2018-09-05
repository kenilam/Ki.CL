// @flow
import React from 'react';

import * as PIXI from '@inlet/react-pixi';

import classnames from 'classnames';

type className = string;

type options = {
    height: number,
    width: number
};

type Props = {
    className: Array<className> | string,
    children: React.Node,
    height: number,
    options: options,
    width: number
};

const { devicePixelRatio } = window;

const defaultOptions = {
    antialias: true,
    resolution: devicePixelRatio,
    roundPixels: true,
    transparent: true
};

const { Stage } = PIXI;

const GraphicLayer = ({
    className,
    children,
    height,
    options,
    width
}: Props) => {
    height /= devicePixelRatio;
    width /= devicePixelRatio;

    return (
        <Stage
            className={classnames(className, 'graphic-layer')}
            options={Object.assign(defaultOptions, options)}
            {...{ height, width }}
        >
            {React.Children.map(children, child =>
                React.cloneElement(child, { height, width })
            )}
        </Stage>
    );
};

export { PIXI, devicePixelRatio };
export default GraphicLayer;
