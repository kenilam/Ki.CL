(
    function (app) {
        app.service(
            'tween',
            [
                function () {
                    return function (target, duration, delay, property, stagger) {
                        return function (callback) {
                            property.delay = delay;
                            property.ease = Expo.easeOut;

                            if (typeof callback === 'function') {
                                property.onComplete = callback;
                            } else if (typeof callback === 'object') {
                                property.onUpdate = callback.progress;
                                property.onComplete = callback.complete;
                            }

                            TweenMax.staggerTo(target, duration, property, stagger || 0);
                        }
                    }
                }
            ]
        );
    }
)(kicl);