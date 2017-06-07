'use strict';

import { ResizeSensor } from 'css-element-queries';

import React from 'react/lib/ReactWithAddons';

import { extend } from 'jquery';

import Unwrap from './Unwrap';

class Component extends React.Component {

    static ResizeSensor = ResizeSensor;

    static Unwrap = Unwrap;

    constructor (props) {
        super(props);

        this.state = {};
    }

    setState (currentState) {
        return new Promise(
            resolve => super.setState(
                previousState => extend(true, {}, previousState, currentState),
                resolve
            )
        )
    }

    updateSizes () {
        if (!this.element) {
            return;
        }

        if (this.props.updateWrapperSize) {
            this.props.updateWrapperSize({
                height: this.element.offsetHeight,
                width: this.element.offsetWidth
            });
        }
    }

    componentDidMount () {
        if (!this.element) {
            return;
        }

        this.updateSizes();

        new ResizeSensor(this.element, this.updateSizes.bind(this));
    }

    componentWillUnmount () {
        if (!this.element) {
            return;
        }

        ResizeSensor.detach(this.element, this.updateSizes);
    }
}

export default Component;