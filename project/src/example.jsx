import React from 'react';
import LegalConsentBanner from './NewBanner/component';
import Button from './Banner/Button.jsx';

class Example extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.activateBanner = this.activateBanner.bind(this);
        this.deactivateBanner = this.deactivateBanner.bind(this);
    }

    componentDidMount () {
        setTimeout(this.activateBanner, 100);
    }

    activateBanner () {
        this.setState({ isOpen: true });
    }

    deactivateBanner () {
        this.setState({ isOpen: false });
    }

    render () {
        const bannerState = this.state.isOpen ? this.deactivateBanner : this.activateBanner;

        return (
            <div>
                <Button onClick={bannerState}>
                    Toggle banner
                </Button>
                <LegalConsentBanner
                    headline="We've made changes to our website and services"
                    button={ {
                        children: 'I Agree',
                        onClick: () => this.deactivateBanner()
                    } }
                    isOpen={this.state.isOpen}
                >By continuing to use Indeed, you agree to our <a href="#">Terms of Service</a></LegalConsentBanner>
            </div>
        );
    }
}
export default Example;