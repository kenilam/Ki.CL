'use strict';

class CSSTransitionGroup {
    constructor (component, timeout, children, key) {
        return <React.addons.CSSTransitionGroup
            component={component}
            transitionName='animate'
            transitionAppear={true}
            transitionEnterTimeout={timeout}
            transitionLeaveTimeout={timeout}
            transitionAppearTimeout={timeout}
        >
            {React.cloneElement(children || <div />, { key })}
        </React.addons.CSSTransitionGroup>;
    }
}

export default CSSTransitionGroup;