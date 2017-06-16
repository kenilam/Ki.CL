'use strict';

import AsyncEmitter from 'async-emitter';
import React from 'react/lib/ReactWithAddons';

import { ResizeSensor } from 'css-element-queries';
import { extend } from 'jquery';

import Unwrap from './Unwrap';

const Events = new AsyncEmitter();

class Component extends React.Component {
    static ResizeSensor = ResizeSensor;
    static Unwrap = Unwrap;
    static Events = Events;

    constructor (props) {
        super(props);

        this.state = {};

        this.updateSizes = this.updateSizes.bind(this);
    }

    setState (currentState) {
        return new Promise(
            resolve => super.setState(
                previousState => extend(true, {}, previousState, currentState),
                () => resolve(currentState)
            )
        )
    }

    updateSizes () {
        this.props.updateSizes({
            height: this.element.offsetHeight,
            width: this.element.offsetWidth
        });
    }

    componentDidMount () {
        if (this.handleScroll) {
            window.addEventListener('scroll', this.handleScroll);
        }

        if (!this.element || !this.props.updateSizes) {
            return;
        }

        this.updateSizes();

        new ResizeSensor(this.element, this.updateSizes);
    }

    componentWillUnmount () {
        if (!this.element) {
            return;
        }

        ResizeSensor.detach(this.element, this.updateSizes);

        if (!this.handleScroll) {
            return;
        }
        window.removeEventListener('scroll', this.handleScroll);
    }
}

export default Component;