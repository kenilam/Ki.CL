// @flow
import React from 'react';

import { TweenLite } from 'gsap';

import { PIXI } from 'Component/GraphicLayer';

import { randomNumberByRange, randomRgb2Hex } from 'Helper';

type Props = {
    height: number,
    index: number,
    ratio: number,
    width: number
};

const { Graphics } = PIXI;

const blendMode = window.PIXI.BLEND_MODES.SCREEN_NPM;

const ease = window.Linear.easeIn;

const duration = (max = 20, min = 8) => randomNumberByRange(max, min);

const fillColor = (max = 100, min = 80) => randomRgb2Hex(max, min);

const scale = (max = 100, min = 1) => randomNumberByRange(max, min) / 100;
const size = (max = 20, min = 4) => randomNumberByRange(max, min) * scale();

class Particle extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.draw = this.draw.bind(this);
    }

    componentWillUnmount() {
        TweenLite.killTweensOf(this.graphic);
        TweenLite.killTweensOf(this.graphic.position);
    }

    draw(graphic) {
        graphic.beginFill(fillColor()).arc(0, 0, size(), 0, Math.PI * 2);

        TweenLite.set(graphic, {
            pixi: {
                scale: scale(),
                blendMode
            }
        });

        TweenLite.set(graphic.position, this.position());

        this.graphic = graphic;
    }

    render() {
        return <Graphics {...{ draw: this.draw }} />;
    }
}

export default Particle;
