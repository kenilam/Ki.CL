(
    function init (app) {
        'use strict';
        
        app
            .service('tween',
                [
                    function service () {
                        return function trigger (target, duration, delay, property, stagger) {
                            return function whenDone (callback) {
                                property.delay = delay;
                                property.ease = Expo.easeOut;

                                if (typeof callback === 'function') {
                                    property.onComplete = callback;
                                } else if (typeof callback === 'object') {
                                    if (callback.progress) {
                                        property.onUpdate = callback.progress;
                                    }

                                    if (callback.complete) {
                                        property.onComplete = callback.complete;
                                    }
                                }

                                TweenMax.staggerTo(target, duration, property, stagger || 0);
                            };
                        };
                    }
                ]
            );
    }
)(kicl);