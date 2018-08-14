import PixiPlugin from 'gsap/PixiPlugin';

const { parseColor } = PixiPlugin;

class Helper {
    static get windowSize() {
        const { innerHeight: height, innerWidth: width } = window;

        return { width, height };
    }

    static get hashToRoutes() {
        return window.location.hash.substr(2);
    }

    static get randomId() {
        return `${new Date().getTime()}_${Math.floor(Math.random() * 1000) +
            1}`;
    }

    static hex2Decimal(hex) {
        return parseColor(hex, 'number');
    }
}

export default Helper;
