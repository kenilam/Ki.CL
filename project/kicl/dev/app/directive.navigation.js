"use strict";
(
    function (app) {
        app.directive('navigation', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/navigation.html',
                controller: [
                    '$rootScope', '$scope', '$stateParams', '$timeout', 'config',
                    function (root, scope, stateParams, timeout, config) {
                        var route = _.rest(config.route.map.split('/:'));

                        scope._ = _;

                        scope.navigation = {
                            list : _.map(scope.$parent.navigation, function (nav) {
                                var list = {
                                        name : nav.name
                                    },
                                    ref = {};

                                if (nav.link) list.link = nav.link;

                                if (nav.route) {
                                    ref.state = [];
                                    ref.name = [];

                                    list.state = {};

                                    _.map(nav.route.split('/'), function (r, k) {
                                        ref.state.push(route[k]);
                                        ref.name.push(route[k] + ':"' + r + '"');

                                        list.state[route[k]] = r;
                                    });

                                    list.route = ref.state.join('.') + '({' + ref.name.join(',') + '})';
                                }
                                return list;
                            }),
                            state : {}
                        };

                        timeout.cancel(scope.timer);
                        scope.timer = timeout(function () {
                            scope.navigation.route = route[_.toArray(stateParams).length];
                        }, 0);

                        scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                            scope.navigation.state = toParams;
                        });
                    }
                ]
            }
        });
    }
)(kicl);
