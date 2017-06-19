'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { DOM } from '~/Helper';

import View from '~/View';

import { GlobalHeader, GlobalFooter } from '~/Component';

class App {
    constructor () {
        this.body = document.body;
        this.scriptTag = this.body.querySelector('script');

        this.initialState();
    }

    updateViewSizes (sizes) {
        View.Events.emit('view.style', {paddingTop : sizes.height});
    }

    updateRoute (route) {
        this.body.dataset.route = route.route;
        this.body.dataset.view = route.name;
    }

    appendElement (element) {
        const domElement = document.createElement('div');

        this.scriptTag.parentNode.insertBefore(domElement, this.scriptTag);

        ReactDOM.render(element, domElement);

        DOM.Unwrap.parent(domElement);
    }

    initialState () {
        this.appendElement(<View updateRoute={this.updateRoute.bind(this)}/>);
        this.appendElement(<GlobalHeader updateSizes={this.updateViewSizes.bind(this)} />);
        this.appendElement(<GlobalFooter />);

        this.body.insertBefore(this.body.querySelector('.GlobalHeader'), this.body.querySelector('main'));
        this.view = this.body.querySelector('main');

        if (location.hash !== '#/') {
            return;
        }

        this.body.classList.add('isInitialLoad');
        setTimeout(
            () => this.body.classList.remove('isInitialLoad'),
            DOM.Style.getTransitionDuration(this.view, true)
        );
    }
}

export default new App();