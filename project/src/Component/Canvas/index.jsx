'use strict';

import React from 'react';
import * as PIXI from 'pixi.js';

import { TweenLite, EasingPack } from 'gsap';

import { DOM, Utility } from '~/Helper';

import resource from './resource.json';

class Canvas extends DOM.Component {
    constructor (props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.draw = this.draw.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.setup = this.setup.bind(this);
    }

    static Engine = PIXI;
    static Tween = TweenLite;
    static Ease = Power0.easeInOut;

    static loadAssets (resources) {
        if (!Array.isArray(resources)) {
            resources = [resources];
        }

        resources
            .filter( resource => !Canvas.Engine.loader.resources[resource.name] )
            .forEach( resource => Canvas.Engine.loader.add(resource.name, resource.url) );

        return new Promise(
            resolve => {
                Canvas.Engine.loader.load();
                Canvas.Engine.loader.once('complete', (loader, resources) => resolve({
                    loader : loader,
                    resources : resources
                }));
            }
        );
    }

    animate () {}

    draw () {}

    setup () {
        this.app = new Canvas.Engine.Application(
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
    }

    init () {
        DOM.Component.cancelAnimationFrame(this.startframe);
        this.startframe = DOM.Component.requestAnimationFrame(() => {
            if (!Utility.IsEmpty.object(this.props.style)) {
                this.init();

                return;
            }

            this.setup();
        });
    }

    resizeHandler ({ width, height }) {

    }

    componentDidMount () {
        super.componentDidMount();

        this.init();
    }

    componentWillUnmount () {
        DOM.Component.cancelAnimationFrame(this.startframe);
    }

    render () {
        return (
            <div
                className={resource.name}
                style={this.props.style}
                ref='element'
            >
                <canvas
                    height={this.props.style.height}
                    width={this.props.style.width}
                    style={this.props.style}
                    ref='canvas'
                />
            </div>
        )
    }
}

export default Canvas;