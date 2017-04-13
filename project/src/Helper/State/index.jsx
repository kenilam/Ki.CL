'use strict';

class State {
    update (_this, currentState, callback) {
        if (!_this.updater.isMounted(_this)) {
            return;
        }

        _this.setState((previousState) => {
            return $.extend(true, {}, previousState, currentState);
        }, callback ? callback : null);
    }
}

export default new State();