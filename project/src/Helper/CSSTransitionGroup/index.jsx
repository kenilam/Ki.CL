'use strict';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
const cloneElement = React.cloneElement;

class CSSTransitionGroup {
    constructor (component, timeout, children, key) {
        return <ReactCSSTransitionGroup
            component={component}
            transitionName='animate'
            transitionAppear={true}
            transitionEnterTimeout={timeout}
            transitionLeaveTimeout={timeout}
            transitionAppearTimeout={timeout}
        >
            {cloneElement(children || <div />, { key })}
        </ReactCSSTransitionGroup>;
    }
}

export default CSSTransitionGroup;