'use strict';

import { DOM, Utility } from '~/Helper';

class Ring {
    constructor ({props, stage}) {
        this.props = props;
        this.stage = stage;

        this.limit = {};

        this.animate = this.animate.bind(this);
        this.draw = this.draw.bind(this);
        this.getTweenProperties = this.getTweenProperties.bind(this);
        this.setLimit = this.setLimit.bind(this);
        this.setParticleProperties = this.setParticleProperties.bind(this);
    }

    setLimit ({ width, height }) {
        this.limit = {
            x : width / 2,
            y : height / 2,
            height : height,
            width : width
        };

        if (width > height) {
            this.limit.radius = (this.limit.height > this.props.minSizes.height ? this.limit.height : this.props.minSizes.height) / 3;

            return this.limit;
        }

        this.limit.radius = (this.limit.width > this.props.minSizes.width ? this.limit.width : this.props.minSizes.width) / 3;

        return this.limit;
    }

    setParticleProperties () {
        if (Utility.IsEmpty.object(this.limit)) {
            throw new Error('limit can not be empty when setParticleProperties is triggered');
        }

        const p = Math.random(this.limit.right / 8, this.limit.right / 4);

        const angleX = Math.cos(2 * Math.PI * p);
        const angleY = Math.sin(2 * Math.PI * p);

        return {
            min : {
                alpha : 0.1,
                scale : 0.1,
                x : () => this.limit.x + (this.limit.radius * angleX),
                y : () => this.limit.y + (this.limit.radius * angleY)
            },
            max : {
                alpha : 0.8,
                scale : 1,
                x : () => this.limit.x + (this.limit.radius / Utility.Random.range(1, 2) * angleX),
                y : () => this.limit.y + (this.limit.radius / Utility.Random.range(1, 2) * angleY)
            }
        };
    }

    getTweenProperties (particle) {
        const alpha = particle.alpha === 0 ? Utility.Random.range(0.6, 0.8) : 0;

        return {
            alpha : alpha,
            scale : alpha === 0 ? 0 : Utility.Random.range(
                particle.props.ring.min.scale,
                particle.props.ring.max.scale
            ),
            x : Utility.Random.range(
                particle.props.ring.min.x(),
                particle.props.ring.max.x()
            ),
            y : Utility.Random.range(
                particle.props.ring.min.y(),
                particle.props.ring.max.y()
            ),
            onComplete : () => this.animate(particle, Utility.Random.range(300, 1000))
        };
    }

    getScaleProperties (particle) {
        const scale = Utility.Random.range(
            particle.props.ring.min.scale,
            particle.props.ring.max.scale
        );

        return {
            x : scale,
            y : scale
        };
    }

    tint (particle) {
        if (particle.alpha !== 0) {
            return;
        }

        DOM.Tween.set(particle, {
            colorProps : {
                tint : 0xFFFFFF * Math.random(), format : 'number'
            }
        });
    }

    draw (particle) {
        DOM.Tween.killTweensOf(particle);
        DOM.Tween.killTweensOf(particle.scale);

        DOM.Tween.set(particle, this.getTweenProperties(particle, { alpha : 1 }));
        DOM.Tween.set(particle.scale, this.getScaleProperties(particle));

        this.tint(particle);
    }

    animate (particle, duration) {
        DOM.Tween.to(particle, this.getTweenProperties(particle), duration);
        DOM.Tween.to(particle.scale, this.getScaleProperties(particle, duration), duration);

        this.tint(particle);
    }
}

export default Ring;