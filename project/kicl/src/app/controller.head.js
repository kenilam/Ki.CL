(
    function (app) {
        app.controller('head', [
            '$rootScope', '$scope', 'config',
            function (root, scope, config) {
                root.resource.$promise.then(function (resource) {
                    scope.info = resource.info;

                    scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                        scope.route = (
                            function () {
                                var route = _.map(
                                    _.toArray(toParams), function (value) {
                                        return value === 'home' ? resource.info.title : value;
                                    }
                                );

                                if (route.length > 1) {
                                    route = _.without(route, config.route.index).join(' | ').toUpperCase();
                                }

                                return route;
                            }
                        )();
                    });
                });
            }
        ]);
    }
)(kicl);