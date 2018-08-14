// @flow
import React from 'react';

import * as PIXI from '@inlet/react-pixi';

import classnames from 'classnames';

type className = String;

type options = {
    height: Number,
    width: Number
};

type Props = {
    className: Array<className> | String,
    children: React.Node,
    height: Number,
    options: options,
    width: Number
};

const defaultOptions = {
    antialias: true,
    resolution: window.devicePixelRatio,
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
    height /= window.devicePixelRatio;
    width /= window.devicePixelRatio;

    return (
        <Stage
            className={classnames(className, 'graphic-layer')}
            options={Object.assign(defaultOptions, options)}
            {...{ height, width }}
        >
            {children}
        </Stage>
    );
};

export { PIXI };
export default GraphicLayer;
