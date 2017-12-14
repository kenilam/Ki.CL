'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// import { TransitionGroup } from '~/Component';

// import { DOM } from '~/Helper';

// import View from '~/View';

// import { GlobalHeader, GlobalFooter } from '~/Component';

class App {
    constructor () {
        this.body = document.body;
        // this.scriptTag = this.body.querySelector('script');

        // this.initialState();
        
        ReactDOM.render(<div>Keni</div>, document.body);
    }

    // updateViewSizes (sizes) {
    //     View.Events.emit('view.style', {paddingTop : sizes.height});
    // }

    // updateRoute (route) {
    //     this.body.dataset.route = route.route;
    //     this.body.dataset.view = route.name;
    // }

    // appendElement (element) {
    //     const domElement = document.createElement('div');

    //     this.scriptTag.parentNode.insertBefore(domElement, this.scriptTag);

    //     ReactDOM.render(element, domElement);

    //     DOM.Unwrap.parent(domElement);
    // }

    // initialState () {
    //     this.appendElement(<View routeHandler={this.updateRoute.bind(this)}/>);
    //     this.appendElement(<GlobalHeader resizeHandler={this.updateViewSizes.bind(this)} />);
    //     this.appendElement(<GlobalFooter />);

    //     this.header = this.body.querySelector('.GlobalHeader');

    //     this.body.insertBefore(this.header, this.body.querySelector('main'));

    //     if (location.hash !== '#/') {
    //         return;
    //     }

    //     this.body.classList.add('isInitialLoad');

    //     TransitionGroup.transitionEnd(this.header).then(
    //         () => this.body.classList.remove('isInitialLoad')
    //     );
    // }
}

if (module.hot) {
    
}

export default new App();