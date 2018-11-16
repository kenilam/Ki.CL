// @flow
import * as PIXI from 'pixi.js';

import { TweenLite } from 'gsap';

import { randomNumberByRange, windowSize } from 'Helper';

const { EXCLUSION: blendMode } = PIXI.BLEND_MODES;
const { easeNone: ease } = window.Linear;

class Bubble {
    constructor() {
        this.create = this.create.bind(this);
        this.move = this.move.bind(this);
        this.resize = this.resize.bind(this);

        this.create();
        this.move();

        return Object.assign(this.bubble, {
            resize: this.resize
        });
    }

    create() {
        const { height, width } = windowSize;

        const center = { x: width / 2, y: height / 2 };

        const radius = (width > height ? height : width) / 10;

        this.bubble = new PIXI.Graphics();

        this.bubble
            .beginFill(0x000000)
            .drawCircle(0, 0, randomNumberByRange(radius * 0.4, radius / 0.4))
            .endFill().blendMode = blendMode;

        TweenLite.set(this.bubble, {
            pixi: {
                x: randomNumberByRange(
                    center.x - center.x / 2,
                    center.x + center.x / 2
                ),
                y: randomNumberByRange(0, height)
            }
        });

        this.radius = radius;
    }

    move() {
        const { height } = windowSize;
        const { position } = this.bubble;

        TweenLite.killTweensOf(this.bubble);

        if (position.y <= -this.radius * 2) {
            TweenLite.set(this.bubble, {
                pixi: {
                    y: randomNumberByRange(
                        height + this.radius,
                        height + this.radius * 2
                    )
                },
                onComplete: this.move
            });

            return;
        }

        TweenLite.to(this.bubble, 1, {
            pixi: {
                rotation:
                    this.bubble.rotation < 360
                        ? this.bubble.rotation + randomNumberByRange(80, 100)
                        : 0,
                x: position.x + randomNumberByRange(-2, 2),
                y: position.y - randomNumberByRange(5, 10)
            },
            ease,
            onComplete: this.move
        });
    }

    resize() {
        const { height, width } = windowSize;

        const { position, graphicsData } = this.bubble;
        const { radius } = graphicsData[0].shape;
        const size = width > height ? height : width;

        this.bubble
            .drawCircle(0, 0, size * (radius / size))
            .endFill().blendMode = blendMode;

        TweenLite.set(this.bubble, {
            pixi: {
                x: (width / position.x) * width,
                y: (height / position.y) * height
            }
        });
    }
}

class Lava {
    constructor(count = 10) {
        this.count = count;

        this.resizeHandler = this.resizeHandler.bind(this);

        this.init();

        return {
            ...this.container,
            resizeHandler: this.resizeHandler
        };
    }

    init() {
        this.container = new PIXI.Container();

        // this.base = new Bubble();

        // this.base.drawRect(
        //     0,
        //     0,
        //     windowSize.width,
        //     windowSize.height
        // ).position = {
        //     x: 0,
        //     y: 0
        // };

        // this.container.addChild(this.base);

        this.bubbles = Array.from(Array(this.count).keys()).map(() => {
            const bubble = new Bubble();

            this.container.addChild(bubble);

            return bubble;
        });

        return this.container;
    }

    resizeHandler() {
        this.bubbles.forEach(bubble => {
            bubble.resize();
        });
    }
}

export { Bubble };
export default Lava;
