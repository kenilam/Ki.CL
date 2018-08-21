import PixiPlugin from 'gsap/PixiPlugin';

import { routes } from 'content/resources';

const { parseColor } = PixiPlugin;

const home = routes.home.name.toLowerCase();

class Helper {
    static get windowSize() {
        const { innerHeight: height, innerWidth: width } = window;

        return { width, height };
    }

    static get hashToRoutes() {
        return window.location.hash.substr(2).replace(/\//g, '.') || home;
    }

    static get randomId() {
        return `${new Date().getTime()}_${Math.floor(Math.random() * 1000) +
            1}`;
    }

    static hex2Decimal(hex) {
        return parseColor(hex.toUpperCase(), 'number');
    }
}

export default Helper;
