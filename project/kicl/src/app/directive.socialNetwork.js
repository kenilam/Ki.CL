(
    function (app) {
        app.directive('socialNetwork', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/socialNetwork.html',
                controller: [
                    '$rootScope', '$scope', 'config',
                    function (root, scope, config) {
                        root.resource.$promise.then(function (resource) {
                            scope.socialNetwork = resource.socialNetwork;
                        });
                    }
                ]
            }
        });
    }
)(kicl);
