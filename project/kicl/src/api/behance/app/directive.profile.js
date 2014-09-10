(
    function (app) {
        app.directive('behanceProfile', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'api/behance/template/profile.html',
                controller: [
                    '$rootScope', '$scope',
                    function (root, scope) {
                        root.api.behance.resource.$promise.then(function () {
                            root.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                                root.api.behance.profile.jsonp().$promise.then(function (data) {
                                    scope.profile = data.user;
                                });
                            });
                        });
                    }
                ]
            }
        });
    }
)(behance);
