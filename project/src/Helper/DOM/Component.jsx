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

    ResizeHandler = {
        add () {
            if (this.element && this.props.updateSizes) {
                this.updateSizes();

                new ResizeSensor(this.element, this.updateSizes);
            }
        },

        detect () {
            if (this.element && this.props.updateSizes) {
                ResizeSensor.detach(this.element, this.updateSizes);
            }
        }
    };

    ScrollHandler = {
        add () {
            if (this.props.scrollHandler || this.scrollHandler) {
                window.addEventListener('scroll', this.props.scrollHandler || this.scrollHandler);
            }
        },

        detect () {
            if (this.props.scrollHandler || this.scrollHandler) {
                window.removeEventListener('scroll', this.props.scrollHandler || this.scrollHandler);
            }
        }
    };

    constructor (props) {
        super(props);

        this.state = {};

        this.ScrollHandler.add = this.ScrollHandler.add.bind(this);
        this.ScrollHandler.detect = this.ScrollHandler.detect.bind(this);

        this.ResizeHandler.add = this.ResizeHandler.add.bind(this);
        this.ResizeHandler.detect = this.ResizeHandler.detect.bind(this);

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
        cancelAnimationFrame(this.updateSizesFrame);

        this.updateSizesFrame = requestAnimationFrame(
            () => this.props.updateSizes({
                height: this.element.offsetHeight,
                width: this.element.offsetWidth
            })
        );
    }

    componentDidMount () {
        this.ScrollHandler.add();
        this.ResizeHandler.add();
    }

    componentWillUnmount () {
        this.ScrollHandler.detect();
        this.ResizeHandler.detect();
    }
}

export default Component;