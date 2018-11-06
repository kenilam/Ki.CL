// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';

import * as PIXI from 'pixi.js';

import { TweenLite } from 'gsap';

import { DOM } from 'Component';
import { cssUnit, windowSize } from 'Helper';

import about from 'View/About/style.scss';
import contact from 'View/Contact/style.scss';
import works from 'View/Works/style.scss';

// import Lava from './Lava';

import style from './style.scss';

const { routesAttr } = DOM.Body;

const { delay, duration, size } = style;

const config = {
    renderer: {
        antialias: true,
        autoResize: true,
        forceCanvas: true,
        forceFXAA: true,
        resolution: window.devicePixelRatio || 1,
        roundPixels: true,
        transparent: true
    },
    graphics: {
        color: {
            home: style,
            about: about,
            contact: contact,
            works: works
        },
        delay: delay.replace('ms', '') / 1000,
        duration: duration.replace('ms', '') / 1000,
        size
    }
};

class Background extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.app = {};

        this.node = React.createRef();

        this.creatApp = this.creatApp.bind(this);
        this.draw = this.draw.bind(this);
        this.fillColor = this.fillColor.bind(this);
        this.update = this.update.bind(this);

        this.historyHandler = this.historyHandler.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    componentDidMount() {
        const { addEventListener } = window;

        this.app = this.creatApp();

        TweenLite.ticker.addEventListener('tick', this.update);

        addEventListener('resize', this.resizeHandler, false);

        this.removeRoutesAttrObserver = routesAttr.observe(this.fillColor);

        this.draw();
        this.fillColor();
        this.update();
    }

    componentWillUnmount() {
        const { cancelAnimationFrame, removeEventListener } = window;

        cancelAnimationFrame(this.removeResizeHandlerAnimationFrame);

        TweenLite.ticker.removeEventListener('tick', this.update);

        removeEventListener('resize', this.resizeHandler, false);

        this.removeRoutesAttrObserver();
    }

    draw() {
        const { mask, graphics } = this.app;
        const { left, right } = graphics;
        const { height, width } = windowSize;
        const { size } = config.graphics;

        const space = cssUnit(size);

        const center = width / 2;

        mask.clear()
            .beginFill(0x000000)
            .drawPolygon([0, 0, width, 0, width, height, 0, height])
            .drawPolygon([
                space,
                space,
                width - space,
                space,
                width - space,
                height - space,
                space,
                height - space
            ])
            .addHole();

        left.clear()
            .drawRect(0, 0, center, height)
            .endFill();

        right
            .clear()
            .drawRect(center, 0, center, height)
            .endFill();
    }

    fillColor(props = { freeze: false }) {
        const { freeze } = props;
        const { graphics } = this.app;
        const { delay, duration } = config.graphics;

        const currentRoute = routesAttr.get('current')[0];
        const previousRoute = routesAttr.get('previous')[0];

        const current = config.graphics.color[currentRoute];
        const previous = config.graphics.color[previousRoute];

        function changeFillColor(name) {
            const graphic = graphics[name];

            TweenLite.killTweensOf(graphic);

            TweenLite.set(graphic, {
                pixi: {
                    fillColor: (freeze ? current : previous)[`${name}Color`]
                }
            });

            if (freeze) {
                return;
            }

            TweenLite.to(graphic, duration, {
                delay: previousRoute !== 'home' ? delay : 0,
                pixi: {
                    fillColor: current[`${name}Color`]
                }
            });
        }

        changeFillColor('left');
        changeFillColor('right');
    }

    creatApp() {
        const view = this.node.current;
        const { height, width } = windowSize;

        const renderer = PIXI.autoDetectRenderer(width, height, {
            ...config.renderer,
            view
        });

        const container = new PIXI.Container();

        const mask = new PIXI.Graphics();

        // const lava = new Lava();

        const left = new PIXI.Graphics();
        const right = new PIXI.Graphics();

        // const graphics = { lava, left, right };
        const graphics = { left, right };

        left.mask = mask;
        right.mask = mask;

        // container.addChild(lava);
        container.addChild(left);
        container.addChild(right);

        return { graphics, mask, renderer, container };
    }

    update() {
        const { renderer, container } = this.app;

        renderer.render(container);
    }

    historyHandler() {
        this.fillColor();
    }

    resizeHandler() {
        const { cancelAnimationFrame, requestAnimationFrame } = window;
        const { height, width } = windowSize;

        cancelAnimationFrame(this.removeResizeHandlerAnimationFrame);
        this.removeResizeHandlerAnimationFrame = requestAnimationFrame(() => {
            this.app.renderer.resize(width, height);

            this.draw();
            this.fillColor({ freeze: true });
            this.update();

            // this.app.graphics.lava.resizeHandler();
        });
    }

    render() {
        return <canvas ref={this.node} />;
    }
}

const Component = withRouter(Background);

export default Component;
