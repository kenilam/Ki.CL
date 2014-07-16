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
                    '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'config',
                    function (root, scope, state, stateParams, timeout, config) {
                        var route = _.rest(config.route.map.split('/:'));

                        scope.navigation = {
                            list : _.map(scope.$parent.navigation, function (nav) {
                                var list = {
                                        name : nav.name
                                    },
                                    ref = {}

                                if (nav.link) list.link = nav.link;

                                if (nav.route) {
                                    ref.state = [];
                                    ref.name = [];
                                    _.map(nav.route.split('/'), function (r, k) {
                                        ref.state.push(route[k]);
                                        ref.name.push(route[k] + ':"' + r + '"');
                                    });
                                    list.route = ref.state.join('.') + '({' + ref.name.join(',') + '})';
                                }
                                return list;
                            })
                        };

                        timeout.cancel(scope.timer);
                        scope.timer = timeout(function () {
                            scope.navigation.state = route[_.toArray(stateParams).length];
                        }, 0);
                    }
                ]
            }
        });
    }
)(kicl);
