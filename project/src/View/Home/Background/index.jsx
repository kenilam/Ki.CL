'use strict';

import React from 'react';

import { Canvas } from '~/Component';

import { DOM, Utility } from '~/Helper';

class Background extends Canvas {
    constructor (props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.draw = this.draw.bind(this);
        this.setup = this.setup.bind(this);
        this.start = this.start.bind(this);
    }

    animate () {
        this.webGL.stage.children.forEach(this.webGL.effect.ring.animate);
    }

    draw () {
        this.webGL.stage.children.forEach(this.webGL.effect.ring.draw);
    }

    start () {
        return new Promise(
            resolve => {
                clearTimeout(this.startTimer);
                DOM.Component.cancelAnimationFrame(this.drawFrame);
                this.drawFrame = DOM.Component.requestAnimationFrame(() => {
                    if (!this.webGL.limitReady) {
                        this.start();

                        return;
                    }

                    this.startTimer = setTimeout(
                        () => {
                            this.webGL.drawParticles(this.props.particleCount);

                            this.draw();

                            resolve();
                        },
                        300
                    );
                });
            }
        );
    }

    setup () {
        DOM.Component.cancelAnimationFrame(this.setupFrame);
        this.setupFrame = DOM.Component.requestAnimationFrame(() => {
            if (!this.webGL) {
                super.setup();
            }

            if (!this.webGL.limitReady) {
                this.setup();

                return;
            }

            this.start();
        });
    }

    resizeHandler ({width, height}) {
        super.resizeHandler({width, height}).then(this.draw);
    }
}

export default Background;