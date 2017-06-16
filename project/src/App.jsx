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

        this.appendElement(<View updateRoute={this.updateRoute.bind(this)}/>);
        this.appendElement(<GlobalHeader updateSizes={App.updateGlobalHeaderSizes.bind(this)} />);
        this.appendElement(<GlobalFooter updateSizes={App.updateGlobalFooterSizes.bind(this)}/>);

        this.body.insertBefore(this.body.querySelector('.GlobalHeader'), this.body.querySelector('main'));
    }

    static updateGlobalHeaderSizes (sizes) {
        View.Events.emit('view.updateStyle', { marginTop : sizes.height  });
    }

    static updateGlobalFooterSizes (sizes) {
        View.Events.emit('view.updateStyle', { marginBottom : sizes.height  });
    }

    updateRoute (route) {
        this.body.dataset.view = route.name;
        this.body.dataset.route = route.route;
    }

    appendElement (element) {
        const domElement = document.createElement('div');

        this.scriptTag.parentNode.insertBefore(domElement, this.scriptTag);

        ReactDOM.render(element, domElement);

        DOM.Unwrap.parent(domElement);
    }
}

export default new App();