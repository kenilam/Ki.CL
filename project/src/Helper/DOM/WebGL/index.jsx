'use strict';

import * as PIXI from 'pixi.js';

import { DOM, Utility } from '~/Helper';

import Ring from './Ring';

class WebGL {
    static defaultParticleCount = 2000;
    static particleSize = {
        min : 2,
        max : 20
    };

	static Engine = PIXI;
    static Graphics = PIXI.Graphics;
    static Loader = PIXI.loader;

	static loadAssets (resources) {
        if (!Array.isArray(resources)) {
            resources = [resources];
        }

        resources
            .filter( resource => !PIXI.loader.resources[resource.name] )
            .forEach( resource => PIXI.loader.add(resource.name, resource.url) );

        return new Promise(
            resolve => {
                PIXI.loader.load();
                PIXI.loader.once('complete', (loader, resources) => resolve({
                    loader : loader,
                    resources : resources
                }));
            }
        );
    }

    constructor ({refs, props}) {
        this.refs = refs;
        this.props = props;
        this.limit = {};

        this.limitReady = false;

        this.effect = {};

        this.setup();

        this.drawParticles = this.drawParticles.bind(this);
        this.setLimit = this.setLimit.bind(this);
        this.setup = this.setup.bind(this);
    }

    setup () {
        this.app = new PIXI.Application(
            {
                antialias : true,
                clearBeforeRender : true,
                forceFXAA : true,
                height : this.props.style.height,
                legacy : true,
                resolution : window.devicePixelRatio,
                roundPixels : true,
                transparent : true,
                view : this.refs.canvas,
                width : this.props.style.width
            }
        );

        this.stage = this.app.stage;
        this.renderer = this.app.renderer;

        this.renderer.render(this.stage);

        this.effect.ring = new Ring({ props : this.props, stage : this.stage });
    }

    setLimit ({width, height}) {
        this.limit = {
            x : width / 2,
            y : height / 2,
            height : height,
            width : width
        };

        Object.keys(this.effect).forEach(
            effectName => this.effect[effectName].setLimit({width, height})
        );

        this.renderer.resize(width, height);

        if (this.limitReady) {
            return;
        }

        this.limitReady = true;
    }

    drawParticles (particleCount) {
        if (Utility.IsEmpty.object(this.stage)) {
            throw new Error('stage can not be empty when draw is triggered');
        }

        [...(new Array(particleCount || WebGL.defaultParticleCount)).keys()].forEach(
            () => {
                const particle = new WebGL.Graphics();

                // particle.interactive = true;
                // particle.buttonMode = true;
                // particle.cursor = 'pointer';

                particle.beginFill(0xFFFFFF);
                particle.drawCircle(0, 0, Utility.Random.range(WebGL.particleSize.min, WebGL.particleSize.max));
                particle.endFill();

                if (!particle.props) {
                    particle.props = {};
                }

                Object.keys(this.effect).forEach(
                    effectName => particle.props[effectName] = this.effect[effectName].setParticleProperties()
                );

                this.stage.addChild(particle);
            }
        );
    }
}

export default WebGL;