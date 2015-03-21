(
    function init (app) {
        'use strict';
        
        app
            .service('stateChangeSuccess',
                [
                    '$rootScope', 'config',
                    function stateChangeSuccess (root, config) {
                        function stateRoute (resource, toParams) {
                            var route = _.toArray(toParams);

                            if (route.length > 1) {
                                route = _.without(route, config.route.index);
                            }

                            return route;
                        }

                        return function trigger (resource) {
                            return function whenStateChange (event, toState, toParams) {
                                var routeArray = stateRoute(resource, toParams);

                                root.status.route = routeArray.join(' | ').replace('home', resource.info.title);
                                root.ref.route = routeArray.join('.');
                            };
                        };
                    }
                ]
            )
            .service('scroll',
                [
                    '$rootScope', '$window', '$timeout',
                    function scroll (root, win, timeout) {
                        var timer,
                            wn = angular.element(win),
                            body,
                            main,
                            header,

                            overTop = function () {
                                if (body.scrollTop() > 0) {
                                    root.ref.scroll.overTop = true;
                                    return;
                                }

                                delete root.ref.scroll.overTop;
                            },
                            overBottom = function () {
                                var main = angular.element('main'),
                                    gap = main.outerHeight() - body.scrollTop(),
                                    height = body.outerHeight();

                                if (gap != height) {
                                    root.ref.scroll.overBottom = true;
                                    return;
                                }

                                delete root.ref.scroll.overBottom;
                            },
                            whileScroll = function () {
                                overTop();
                                overBottom();
                            },
                            whenScroll = function () {
                                timeout.cancel(timeout);
                                timer = timeout(whileScroll, 100);
                            },
                            whenTrigger = function () {
                                body = angular.element('body');
                                header = angular.element('body > header');

                                angular.element(win).bind('scroll', whenScroll);
                                root.$on('$stateChangeSuccess', whenScroll);

                                whenScroll();
                            },
                            trigger = function () {
                                timeout(whenTrigger, 0);

                                return whenScroll;
                            };

                        return trigger;
                    }
                ]
            )
            .service('readyToRun',
                [
                    '$rootScope', '$timeout', 'stateChangeSuccess', 'resize', 'scroll', 'config',
                    function readyToRun (root, timeout, stateChangeSuccess, resize, scroll, config) {
                        function timer () {
                            root.status.ready = true;
                        }

                        function whenResize () {
                            root.ref.whenResize = resize('window', root, angular.element('body'));
                        }

                        function whenScroll () {
                            root.ref.whenScroll = scroll();
                        }

                        function trigger (resource) {
                            root.ref.info = resource.info;

                            timeout.cancel(root.ref.timer.ready);
                            root.ref.timer.ready = timeout(timer, 1500);

                            whenResize();
                            whenScroll();
                            
                            root.$on('$stateChangeSuccess', stateChangeSuccess(resource));
                        }

                        return trigger;
                    }
                ]
            )
            .run(
                [
                    '$rootScope', '$state', '$stateParams', 'async', 'config', 'readyToRun',
                    function run (root, state, stateParams, async, config, readyToRun) {
                        function refUpdate (event, ref) {
                            _.each(ref, function eachRef (property, name) {
                                root.helper._.extend(root.ref[name], property);
                            });

                            root.$broadcast('refChange', root.ref);
                        }

                        function statusUpdate (event, status) {
                            _.each(status, function eachState (property, name) {
                                root.helper._.extend(root.status[name], property);
                            });

                            root.$broadcast('statusChange', root.status);
                        }

                        /* domain */
                        root.domain = {
                            protocol : location.protocol,
                            host : location.hostname,
                            port : location.port
                        };

                        /* helper */
                        root.helper = {
                            _ : _,
                            moment : moment
                        };

                        /* ref */
                        root.ref = {
                            timer : {},
                            resize : {},
                            scroll : {}
                        };
                        root.$on('refUpdate', refUpdate);

                        /* status */
                        root.status = {};
                        root.$on('statusUpdate', statusUpdate);

                        /* resource */
                        root.resource = async({
                            url: root.domain.protocol + '//' + root.domain.host + ':' + root.domain.port,
                            path: config.data.resource
                        }).get();
                        root.resource.$promise.then(readyToRun);

                        /* state && stateParams */
                        root.$state = state;
                        root.$stateParams = stateParams;
                    }
                ]
            );
    }
)(kicl);