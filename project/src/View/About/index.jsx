'use strict';

import { Route } from '@/Helper';

class Content extends React.Component {
    constructor () {
        super();
    }

    render () {
        return {template};
    }
}

class About extends Route {
    constructor () {
        super('about', () => new Content());
    }
}

export default new About();