import PixiPlugin from 'gsap/PixiPlugin';

import { routes } from 'content/resources';

const { parseColor } = PixiPlugin;

const home = routes.home.name.toLowerCase();

class Helper {
    static get randomId() {
        return `${new Date().getTime()}_${Math.random() *
            1000}_${new Date().getMilliseconds()}_${Math.random() * 1000}`;
    }

    static randomNumberByRange(max = 100, min = 0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static randomRgb2Hex(max = 100, min = 0) {
        return window.PIXI.utils.rgb2hex([
            Helper.randomNumberByRange(max, min) / 100,
            Helper.randomNumberByRange(max, min) / 100,
            Helper.randomNumberByRange(max, min) / 100
        ]);
    }

    static get windowSize() {
        const { innerHeight: height, innerWidth: width } = window;

        return { width, height };
    }

    static capitalize(string) {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    }

    static hex2Decimal(hex) {
        return parseColor(hex.toUpperCase(), 'number');
    }

    static pathnameToRoutes(pathname) {
        return pathname.substr(1).replace(/\//g, '.') || home;
    }
}

export default Helper;
