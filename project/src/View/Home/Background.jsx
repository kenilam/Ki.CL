'use strict';

import React from 'react';

import { Canvas } from '~/Component';

import { DOM, Utility } from '~/Helper';

class Background extends Canvas {
    constructor (props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.draw = this.draw.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.setup = this.setup.bind(this);

        this.particleSize = 2;
        this.particleColor = 0x999999;
    }

    static tween (particle, props, duration) {
        return Canvas.Tween.fromTo(
            particle,
            duration || Utility.Random.range(1200, 2400),
            { x : particle.x, y : particle.y, z : particle.z },
            Object.assign({
                useFrames : true,
                ease : Canvas.Ease
            }, props)
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

            return Background.tween(
                particle,
                {
                    delay : Utility.Random.range(0, 1200),

                    alpha : Utility.Random.range(.1, 1),

                    onComplete : () => this.loop(particle)
                },
                Utility.Random.range(1200, 3600)
            );
        }

        return Background.tween(
            particle,
            {
                alpha : 0,
                bezier: {
                    type:'quadratic',
                    values :[
                        {
                            x : Utility.Random.range(this.limit.left, this.limit.right),
                            y : Utility.Random.range(this.limit.left, this.limit.right)
                        },
                        {
                            x : Utility.Random.range(this.limit.left, this.limit.right),
                            y : Utility.Random.range(this.limit.left, this.limit.right),
                            z : Utility.Random.range(this.limit.left, this.limit.right)
                        },
                        {
                            x : Utility.Random.range(this.limit.left, this.limit.right),
                            y : Utility.Random.range(this.limit.left, this.limit.right)
                        }
                    ]
                },

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

    resizeHandler ({ width, height }) {
        if (!this.renderer) {
            return;
        }

        this.limit = {
            bottom : height - this.particleSize,
            left : this.particleSize,
            right : width - this.particleSize,
            top : this.particleSize
        };

        super.resizeHandler({ width, height });

        this.renderer.resize(width, height);

        this.animate();
    }
}

export default Background;