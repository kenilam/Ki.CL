'use strict';

import React from 'react';

import { DOM, Utility } from '~/Helper';

import resource from './resource.json';

class Canvas extends DOM.Component {
    static WebGL = DOM.WebGL;

    static loadAssets = Canvas.WebGL.loadAssets;

    constructor (props) {
        super(props);

        this.props = props;

        this.resizeHandler = this.resizeHandler.bind(this);
        this.setup = this.setup.bind(this);
    }

    setup () {
        this.webGL = new DOM.WebGL({ refs: this.refs, props: this.props});
    }

    init () {
        DOM.Component.cancelAnimationFrame(this.initFrame);
        this.initFrame = DOM.Component.requestAnimationFrame(() => {
            if (Utility.IsEmpty.object(this.props.style)) {
                this.init();

                return;
            }

            this.setup();
        });
    }

    resizeHandler ({width, height}) {
        return new Promise(
            resolve => {
                DOM.Component.cancelAnimationFrame(this.resizeHandlerFrame);
                this.resizeHandlerFrame = DOM.Component.requestAnimationFrame(() => {
                    if (!this.webGL) {
                        this.resizeHandler({width, height});

                        return;
                    }

                    this.webGL.setLimit({width, height});

                    resolve();
                });
            }
        );
    }

    componentDidMount () {
        super.componentDidMount();

        this.init();
    }

    componentWillUnmount () {
        super.componentDidMount();

        DOM.Component.cancelAnimationFrame(this.initframe);
    }

    render () {
        return (
            <div
                className={resource.name}
                style={this.props.style}
                ref='element'
            >
                <canvas
                    height={this.props.style.height}
                    width={this.props.style.width}
                    style={this.props.style}
                    ref='canvas'
                />
            </div>
        )
    }
}

export default Canvas;