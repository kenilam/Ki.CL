'use strict';

import getTransitionDuration from 'get-transition-duration';

class Style {
    static toUnit (value, unit, defaultValue) {
        return `${typeof value === 'undefined' ? defaultValue || 0 : value}${unit || ''}`;
    }

    static duration (t) {
        if (!t) {
            return null;
        }

        const duration = `${Style.toUnit(t, 'ms')}`;

        return {
            WebkitTransitionDuration : duration,
            MozTransitionDuration : duration,
            msTransitionDuration : duration,
            OTransitionDuration : duration,
            transitionDuration : duration,
        };
    }

    static translate3d (x, y, z, t) {
        const values = `translate3d(${Style.toUnit(x, 'px')}, ${Style.toUnit(y, 'px')}, ${Style.toUnit(z, 'px')})`;

        return Object.assign({
            WebkitTransform : values,
            MozTransform : values,
            msTransform : values,
            OTransform : values,
            transform : values
        }, Style.duration(t));
    }

    static scale3d (s, t) {
        const value = `${Style.toUnit(s)}`;
        const scale = `scale3d(${value}, ${value}, 1)`;

        return Object.assign({
            WebkitTransform : scale,
            MozTransform : scale,
            msTransform : scale,
            OTransform : `scale3d(${value})`,
            transform : scale
        }, Style.duration(t));
    }

    static zoom (x, y, s, t) {
        const translate3d = Style.translate3d(x, y);
        const scale3d = Style.scale3d(s);

        return Object.assign({
            WebkitTransform : `${translate3d.WebkitTransform} ${scale3d.WebkitTransform}`,
            MozTransform : `${translate3d.MozTransform} ${scale3d.MozTransform}`,
            msTransform : `${translate3d.msTransform} ${scale3d.msTransform}`,
            OTransform : `${translate3d.OTransform} ${scale3d.OTransform}`,
            transform : `${translate3d.transform} ${scale3d.transform}`
        }, Style.duration(t));
    }

    static getTransitionDuration = getTransitionDuration;
}

export default Style;