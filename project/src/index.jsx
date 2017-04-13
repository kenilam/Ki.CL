'use strict';

import App from '@/App';

class Index {
    constructor () {
        this.appRoot = document.querySelector('app-root');

        this.render();
    }

    render () {
        ReactDOM.render(new App(), this.appRoot);

        this.appRoot.parentNode.replaceChild(this.appRoot.childNodes[0], this.appRoot);
    }
}

export default new Index();