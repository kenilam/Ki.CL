'use strict';

import React from 'react';

import { Canvas, Logo, Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import Background from './Background';

import resource from './resource.json';

Sitemap.set(resource.sitemap.name, resource.sitemap);

class Home extends DOM.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            style : {
                background : {}
            }
        };

        this.updateCanvasStyles = this.updateCanvasStyles.bind(this);
    }

    updateCanvasStyles () {
        DOM.Component.cancelAnimationFrame(this.updateCanvasStylesFrame);
        this.updateCanvasStylesFrame = DOM.Component.requestAnimationFrame(() => {
            const sizes = this.refs.element.getBoundingClientRect();

            this.setState({
                style : {
                    background : {
                        height : sizes.height,
                        width : sizes.width
                    }
                }
            });
        });
    }

    componentDidMount () {
        super.componentDidMount();
    }

    componentWillUnmount () {
        super.componentWillUnmount();
    }

    resizeHandler ({ width, height }) {
        const logo = this.refs.element.querySelector('.Logo').getBoundingClientRect();
        const nav = this.refs.element.querySelector('.Navigation').getBoundingClientRect();

        const minHeight = logo.height + nav.height;
        let minWidth = logo.width > nav.width ? logo.width : nav.width;

        if (minHeight > minWidth) {
            minWidth = minHeight;
        }

        this.setState({
            style : {
                background : {
                    height : height,
                    width : width
                }
            },
            minSizes : {
                height : minHeight + (Background.WebGL.particleSize.max * 2),
                width : minWidth + (Background.WebGL.particleSize.max * 2)
            }
        });
    }

    render () {
        return (
            <section
                data-route={resource.sitemap.route}
                data-view={resource.sitemap.name}
                ref='element'
            >
                <Background
                    className='background'
                    particleCount={1000}
                    minSizes={this.state.minSizes}
                    style={this.state.style.background}
                />
                <Logo/>
                <Navigation
                    columnView={true}
                    list={Sitemap.filter(Sitemap.get(), { without : resource.sitemap.name })}
                />
            </section>
        );
    }
}

export default Home;