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

const { delay, duration, size, minSize } = style;

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
    size: size,
    minSize: minSize
  }
};

const container = new PIXI.Container();

const mask = new PIXI.Graphics();

// const lava = new Lava();

const left = new PIXI.Graphics();
const right = new PIXI.Graphics();

class Background extends React.Component {
  constructor(props) {
    super(props);

    this.isTweening = {};

    this.node = React.createRef();

    this.attach = this.attach.bind(this);
    this.creatApp = this.creatApp.bind(this);
    this.draw = this.draw.bind(this);
    this.fillColor = this.fillColor.bind(this);

    this.historyHandler = this.historyHandler.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  componentDidMount() {
    const { addEventListener } = window;

    addEventListener('resize', this.resizeHandler, false);

    this.routesAttrObserver = routesAttr.observe(this.fillColor);

    this.app = this.creatApp();

    this.attach();
    this.draw();
    this.fillColor();

    TweenLite.ticker.addEventListener('tick', this.attach);
  }

  shouldComponentUpdate () {
    return false;
  }

  componentWillUnmount() {
    const { cancelAnimationFrame, removeEventListener } = window;

    TweenLite.ticker.removeEventListener('tick', this.attach);

    cancelAnimationFrame(this.componentDidMountFrame);
    cancelAnimationFrame(this.resizeHandlerFrame);

    removeEventListener('resize', this.resizeHandler, false);

    this.routesAttrObserver.disconnect();
  }

  draw() {
    const { mask, graphics } = this.app;
    const { left, right } = graphics;
    const { height, width } = windowSize;
    
    const { size, minSize } = config.graphics;

    const space = Math.max(cssUnit(size), cssUnit(minSize));

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
    if (!this.app) {
      return;
    }

    const { graphics } = this.app;

    if (!graphics) {
      return;
    }

    const { freeze } = props;

    const { delay, duration } = config.graphics;

    const currentRoute = routesAttr.get('current')[0];
    const previousRoute = routesAttr.get('previous')[0];

    const current = config.graphics.color[currentRoute];
    const previous = config.graphics.color[previousRoute];

    const changeFillColor = name => {
      const graphic = graphics[name];

      if (!graphic || this.isTweening[name]) {
        return;
      }

      const color = `${name}Color`;

      const currentColor = current[color];
      const previousColor = previous[color];

      const onComplete = () => { this.isTweening[name] = false; }

      this.isTweening[name] = true;

      if (freeze) {
        TweenLite.set(graphic,
          { pixi: { fillColor: currentColor }, onComplete }
        );

        return;
      }

      TweenLite.fromTo(graphic, duration,
        { pixi: { fillColor: previousColor } },
        { pixi: { fillColor: currentColor }, onComplete }
      ).delay(previousRoute !== 'home' && currentRoute === 'home' ? delay : 0);
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

    // const graphics = { lava, left, right };
    const graphics = { left, right };

    left.mask = mask;
    right.mask = mask;

    // container.addChild(lava);
    container.addChild(left);
    container.addChild(right);

    return { graphics, mask, renderer, container };
  }

  attach() {
    const { renderer, container } = this.app;

    renderer.render(container);
  }

  historyHandler() {
    this.fillColor();
  }

  resizeHandler() {
    const { cancelAnimationFrame, requestAnimationFrame } = window;
    const { height, width } = windowSize;

    cancelAnimationFrame(this.resizeHandlerFrame);
    this.resizeHandlerFrame = requestAnimationFrame(() => {
      this.app.renderer.resize(width, height);

      this.draw();
      this.fillColor({ freeze: true });
      this.attach();

      // this.app.graphics.lava.resizeHandler();
    });
  }

  render() {
    return <canvas className='background' ref={this.node} />;
  }
}

const Component = withRouter(Background);

export default Component;
