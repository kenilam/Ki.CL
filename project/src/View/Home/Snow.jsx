'use strict';

import React from 'react';

import { Canvas } from '~/Component';

import { DOM, Utility } from '~/Helper';

class Snow extends Canvas {
    constructor (props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.draw = this.draw.bind(this);
        this.setup = this.setup.bind(this);

        this.particleSize = 2;
        this.particleColor = 0x333333;
    }

    static tween (particle, props) {
        return Canvas.Tween.to(
            particle,
            Utility.Random.range(60, 1200),
            Object.assign({ useFrames:true }, props)
        );
    }

    loop (particle) {
        if (particle.alpha === 0) {
            Canvas.Tween.set(
                particle,
                {
                    x : Utility.Random.range(this.limit.left, this.limit.right),
                    y : Utility.Random.range(this.limit.top, this.limit.bottom)
                }
            );

            return Snow.tween(
                particle,
                {
                    alpha : Utility.Random.range(.1, .5),
                    onComplete : () => this.loop(particle)
                }
            );
        }

        return Snow.tween(
            particle,
            {
                delay : Utility.Random.range(0, 1200),

                alpha : 0,
                x : Utility.Random.range(this.limit.left, this.limit.right),
                y : Utility.Random.range(this.limit.top, this.limit.bottom),

                onComplete : () => this.loop(particle)
            }
        );
    }

    animate () {
        super.animate();

        this.stage.children.forEach(particle => this.loop(particle));
    }

    draw () {
        super.draw();

        [...(new Array(this.props.particleCount)).keys()].forEach(
            () => {
                const particle = new Canvas.Engine.Graphics();

                Canvas.Tween.set(
                    particle,
                    {
                        alpha : 0,
                        x : Utility.Random.range(this.limit.left, this.limit.right),
                        y : Utility.Random.range(this.limit.top, this.limit.bottom)
                    }
                );

                particle.beginFill(this.particleColor);
                particle.drawCircle(0, 0, this.particleSize);
                particle.endFill();

                this.stage.addChild(particle);
            }
        );
    }

    setup () {
        this.limit = {
            bottom : this.props.style.height - this.particleSize,
            left : this.particleSize,
            right : this.props.style.width - this.particleSize,
            top : this.particleSize
        };

        super.setup();
        this.draw();
        this.animate();
    }
}

export default Snow;