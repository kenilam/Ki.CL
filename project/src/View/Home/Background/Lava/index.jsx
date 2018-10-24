// @flow
import * as PIXI from 'pixi.js';

import { TweenLite } from 'gsap';

import { randomNumberByRange, windowSize } from 'Helper';

const { EXCLUSION: blendMode } = PIXI.BLEND_MODES;

class Bubble {
    constructor() {
        this.create = this.create.bind(this);
        this.move = this.move.bind(this);

        this.create();
        // this.move();

        return this.bubble;
    }

    create() {
        const { height, width } = windowSize;

        const center = { x: width / 2, y: height / 2 };

        const radius = (width > height ? height : width) / 10;

        const bubble = new PIXI.Graphics();

        bubble
            .beginFill(0x000000)
            .drawCircle(0, 0, randomNumberByRange(radius * 0.4, radius))
            .endFill().blendMode = blendMode;

        TweenLite.set(bubble, {
            pixi: {
                x: randomNumberByRange(center.x - 100, center.x + 100),
                y: randomNumberByRange(center.y - 100, center.y + 100)
            }
        });

        this.bubble = bubble;
        this.radius = radius;
    }

    move() {
        const { height } = windowSize;
        const { position } = this.bubble;

        TweenLite.killTweensOf(this.bubble);

        if (position.y <= 0) {
            TweenLite.set(this.bubble, {
                pixi: {
                    y: randomNumberByRange(
                        height + this.radius,
                        height + height
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
            ease: window.Linear.easeNone,
            onComplete: this.move
        });
    }
}

class Lava {
    constructor(count = 10) {
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

        this.bubbles = Array.from(Array(count).keys()).map(() => {
            const bubble = new Bubble();

            this.container.addChild(bubble);

            return bubble;
        });

        return this.container;
    }
}

export { Bubble };
export default Lava;
