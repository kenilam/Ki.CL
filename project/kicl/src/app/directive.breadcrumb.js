(
    function init (app) {
        'use strict';
        
        app
            .service('breadcrumb_stateChange',
                [
                    '$rootScope', '$timeout', 'config',
                    function whenStateChange (root, timeout, config) {
                        var idx = 0,
                            route = _.rest(config.route.map.split('/:'));

                        return function trigger (scope, elm) {
                            root.$on('$stateChangeSuccess', function whileStateChange (event, toState, toParams) {
                                scope.breadcrumb.list = [];

                                scope.breadcrumb.list = _.reject(
                                    _.map(toParams, function eachList (name) {
                                        idx ++;

                                        return {
                                            name : name,
                                            route : route.slice(0, idx).join('.') + '({' + route[idx - 1] + ':"' + name + '"' + '})'
                                        };
                                    }
                                ), function shouldReject (obj) { return obj.name === config.route.index; });

                                scope.breadcrumb.state = _.toArray(toParams).join('.');

                                idx = 0;
                            });
                        };
                    }
                ]
            )
            .service('breadcrumb_link',
                [
                    '$rootScope', 'config', 'resize', 'breadcrumb_stateChange',
                    function link (root, config, resize, stateChange) {
                        return function trigger (scope, elm) {
                            var idx = 0,
                                route = _.rest(config.route.map.split('/:'));
                            
                            scope.breadcrumb = {
                                timer : {},
                                root : {
                                    name : config.route.index,
                                    route : route[idx] + '({' + route[idx] + ':"' + config.route.index + '"})'
                                },
                                resize : resize('breadcrumb', scope, elm)
                            };

                            stateChange(scope, elm);
                        };
                    }
                ]
            )
            .directive('breadcrumb',
                [
                    'breadcrumb_link',
                    function directive (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            scope : {
                                'isolate' : '&'
                            },
                            templateUrl: 'partial/breadcrumb.html',
                            link: link
                        };
                    }
                ]
            );
    }
)(kicl);
