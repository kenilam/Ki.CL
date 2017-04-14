'use strict';

import React from '#/react/react';

import { Unwrap } from '@/Helper';

class Footer extends React.Component {
    componentDidMount () {
        Unwrap.parent(this.element);
    }

    render () {
        return <div ref={ref => { this.element = ref; }}>
            {template}
        </div>;
    }
}

export default Footer;