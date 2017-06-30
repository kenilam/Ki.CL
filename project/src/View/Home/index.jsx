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

        this.updateCanvasStyles();
        window.addEventListener('resize', this.updateCanvasStyles);
    }

    componentWillUnmount () {
        super.componentWillUnmount();

        cancelAnimationFrame(this.updateCanvasStylesFrame);
        window.removeEventListener('resize', this.updateCanvasStyles);
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
                    style={this.state.style.background}
                    particleCount={200}
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