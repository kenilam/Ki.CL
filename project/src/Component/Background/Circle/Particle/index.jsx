// @flow
import React from 'react';

import { TweenLite } from 'gsap';

import { PIXI } from 'Component/GraphicLayer';

type color = number;

type Props = {
    color: Array<color>,
    height: number,
    index: number,
    ratio: number,
    size: number,
    width: number
};

const ease = window.Linear.easeNone;

const { rgb2hex } = window.PIXI.utils;

const { Graphics } = PIXI;

const sizes = {
    max: 10,
    min: 2
};

const rgb = () => {
    const number = 255 - Math.random(255) + 1;

    return [number, number, number];
};

const size = () => Math.floor(Math.random() * sizes.max) + sizes.min;

const getPosition = ({ index, ratio, height, width }) => {
    const centerY = height / 2;
    const centerX = width / 2;
    const radius = Math.min(centerX, centerY) / 1.2;

    const x = centerX - radius * Math.cos(index / ratio);
    const y = centerY - radius * Math.sin(index / ratio);

    return { x, y };
};

class Particle extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.draw = this.draw.bind(this);
        this.move = this.move.bind(this);
    }

    componentWillUnmount() {
        TweenLite.killTweensOf(this.graphic.position);
        TweenLite.killTweensOf(this.graphic);

        window.cancelAnimationFrame(this.moveFrame);
    }

    draw(graphic) {
        const { color, height, index, ratio, size, width } = this.props;

        this.graphic = graphic;

        this.graphic
            .beginFill(rgb2hex(color))
            .arc(0, 0, size, 0, Math.PI * 2).position = getPosition({
            index,
            ratio,
            height,
            width
        });

        this.move(index);
    }

    move(index) {
        const { height, ratio, width } = this.props;

        const duration = (Math.floor(Math.random() * 2000) + 1000) / 1000;

        const scale = Math.floor(Math.random() * 2) + 0.1;
        const fillColor = rgb2hex(rgb());

        const isSmaller = scale > 0.1;

        const alpha = isSmaller ? 1 : 0;

        TweenLite.to(this.graphic.position, duration, {
            ...getPosition({
                index,
                ratio,
                height,
                width
            }),
            ease
        });

        TweenLite.to(this.graphic, duration, {
            pixi: {
                alpha,
                fillColor,
                scale
            },
            ease,
            onComplete: () => {
                this.move(index - Math.floor(Math.random() * 5) + 10);
            }
        });
    }

    render() {
        return <Graphics {...{ draw: this.draw }} />;
    }
}

export { rgb, size };
export default Particle;
