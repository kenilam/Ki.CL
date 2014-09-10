(
    function (app) {
        app.directive('logo', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/logo.html',
                controller: [
                    '$rootScope', '$scope', 'config',
                    function (root, scope, config) {
                        root.resource.$promise.then(function (resource) {
                            var route = _.first(_.rest(config.route.map.split('/:'))),
                                obj = {};

                            obj[route] = '';

                            scope.logo = {
                                name : resource.info.name + ' | ' + config.route.index,
                                route : route + '({' + route + ':"' + config.route.index + '"})'
                            };
                        });
                    }
                ]
            }
        });
    }
)(kicl);
