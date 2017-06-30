'use strict';

class Random {
    static range (min, max) {
        return ((Math.random() * (max - min)) + min);
    }

    static hex (prefix) {
        return `${prefix ? prefix : '#'}${Math.floor(Math.random()*16777215).toString(16)}`;
    }
}

export default Random;