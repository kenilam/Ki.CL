(
    function init (app) {
        'use strict';
        
        app
            .service('resize',
                [
                    '$rootScope', '$window', '$timeout',
                    function service (root, win, timeout) {
                        return function trigger (name, scope, elm) {
                            var task = {},
                                timer,
                                whileResize = function () {
                                    var height = elm.outerHeight() < 2 ? 0 : elm.outerHeight(),
                                        width = elm.outerWidth() < 2 ? 0 : elm.outerWidth();

                                    task = {};
                                    task[name] = {
                                        height : height,
                                        width : width
                                    };
                                    
                                    scope.$emit('refUpdate', { resize : task });
                                },
                                whenResize = function () {
                                    timeout.cancel(timer);
                                    timer = timeout(whileResize, 500);
                                };

                            task[name] = {};

                            whenResize();
                            angular.element(win).bind('scroll', whenResize);
                            angular.element(win).bind('resize', whenResize);
                            root.$on('$stateChangeSuccess', whenResize);

                            return whenResize;
                        };
                    }
                ]
            );
    }
)(kicl);