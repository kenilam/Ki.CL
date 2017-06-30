'use strict';

import AsyncEmitter from 'async-emitter';
import raf from 'raf';
import React from 'react/lib/ReactWithAddons';

import { ResizeSensor } from 'css-element-queries';
import { extend } from 'jquery';

import Unwrap from './Unwrap';

const Events = new AsyncEmitter();

class Component extends React.Component {
    static ResizeSensor = ResizeSensor;
    static Unwrap = Unwrap;
    static Events = Events;

    static requestAnimationFrame = raf;
    static cancelAnimationFrame = raf.cancel;

    Resizable = {
        handler () {
            const element = (this.element || this.refs.element);

            cancelAnimationFrame(this.ResizableFrame);
            this.ResizableFrame = requestAnimationFrame(
                () => {
                    if (this.resizeHandler) {
                        this.resizeHandler({
                            height: element.offsetHeight,
                            width: element.offsetWidth
                        });
                    }

                    if (this.props.resizeHandler) {
                        this.props.resizeHandler({
                            height: element.offsetHeight,
                            width: element.offsetWidth
                        });
                    }
                }
            );
        },
        validate () {
            return Boolean(this.element || this.refs.element) && Boolean(this.props.resizeHandler || this.resizeHandler);
        },
        add () {
            if (!this.Resizable.validate()) {
                return;
            }

            this.Resizable.handler();

            new ResizeSensor(this.element || this.refs.element, this.Resizable.handler);
        },

        detect () {
            if (!this.Resizable.validate()) {
                return;
            }

            ResizeSensor.detach(this.element || this.refs.element, this.Resizable.handler);
        }
    };

    Scrollable = {
        handler : event => {
            cancelAnimationFrame(this.ScrollableFrame);
            this.ScrollableFrame = requestAnimationFrame(
                () => {
                    if (this.scrollHandler) {
                        this.scrollHandler(event);
                    }

                    if (this.props.scrollHandler) {
                        this.props.scrollHandler(event);
                    }
                }
            );
        },
        validate () {
            return Boolean(this.props.scrollHandler || this.scrollHandler);
        },
        add () {
            if (!this.Scrollable.validate()) {
                return;
            }

            window.addEventListener('scroll', this.Scrollable.handler);
        },

        detect () {
            if (!this.Scrollable.validate()) {
                return;
            }

            window.removeEventListener('scroll', this.Scrollable.handler);
        }
    };

    constructor (props) {
        super(props);

        this.state = {};

        this.Scrollable.add = this.Scrollable.add.bind(this);
        this.Scrollable.detect = this.Scrollable.detect.bind(this);
        this.Scrollable.handler = this.Scrollable.handler.bind(this);
        this.Scrollable.validate = this.Scrollable.validate.bind(this);

        this.Resizable.add = this.Resizable.add.bind(this);
        this.Resizable.detect = this.Resizable.detect.bind(this);
        this.Resizable.handler = this.Resizable.handler.bind(this);
        this.Resizable.validate = this.Resizable.validate.bind(this);
    }

    setState (currentState) {
        return new Promise(
            resolve => super.setState(
                previousState => extend(true, {}, previousState, currentState),
                () => resolve(currentState)
            )
        )
    }

    componentDidMount () {
        this.Scrollable.add();
        this.Resizable.add();
    }

    componentWillUnmount () {
        this.Scrollable.detect();
        this.Resizable.detect();
    }
}

export default Component;