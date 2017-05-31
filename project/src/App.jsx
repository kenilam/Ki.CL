'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { DOM } from './Helper';

import View from './View';

import { GlobalHeader, GlobalFooter } from '~/Component';

class App {
    constructor () {
        this.scriptTag = document.querySelector('script');

        this.appendElement(<GlobalHeader/>);
        this.appendElement(<View/>);
        this.appendElement(<GlobalFooter/>);
    }

    appendElement (element) {
        const domElement = document.createElement('div');

        this.scriptTag.parentNode.insertBefore(domElement, this.scriptTag);

        ReactDOM.render(element, domElement);

        DOM.Unwrap.parent(domElement);
    }
}

export default new App();