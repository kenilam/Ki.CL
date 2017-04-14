'use strict';

class State {
    update (component, currentState, callback) {
        if (!component.updater.isMounted(component)) {
            return;
        }

        component.setState((previousState) => {
            return $.extend(true, {}, previousState, currentState);
        }, callback ? callback : null);
    }
}

export default new State();