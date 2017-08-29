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
            background : {
                style : {},
                minSizes : {}
            }
        };

        this.updateBackgroundProps = this.updateBackgroundProps.bind(this);
    }

    updateBackgroundProps ({ width, height }) {
        DOM.Component.cancelAnimationFrame(this.updateBackgroundPropsFrame);
        this.updateBackgroundPropsFrame = DOM.Component.requestAnimationFrame(() => {
            const logo = this.refs.element.querySelector('.Logo').getBoundingClientRect();
            const nav = this.refs.element.querySelector('.Navigation').getBoundingClientRect();

            const minHeight = logo.height + nav.height;
            let minWidth = logo.width > nav.width ? logo.width : nav.width;

            if (minHeight > minWidth) {
                minWidth = minHeight;
            }

            this.setState({
                background : {
                    style : {
                        height : height,
                        width : width
                    },
                    minSizes : {
                        height : minHeight + (Background.WebGL.particleSize.max * 2),
                        width : minWidth + (Background.WebGL.particleSize.max * 2)
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
        this.updateBackgroundProps({ width, height });
    }

    render () {
        return (
            <section
                data-route={resource.sitemap.route}
                data-view={resource.sitemap.name}
                ref='element'
            >
                <div>
                    <Logo/>
                    <Navigation columnView list={Sitemap.filter(Sitemap.get(), { without : resource.sitemap.name })}/>
                </div>
            </section>
        );
    }
}

export default Home;