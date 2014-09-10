(
    function (app) {
        app.controller('body', [
            '$rootScope', '$scope', '$timeout', '$interval',
            function (root, scope, timeout, interval) {
                scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                    var reference = {
                        header : angular.element('header')
                    };

                    scope.route = _.toArray(toParams).join('.');

                    scope.style = {
                        main : {}
                    };

                    root.resource.$promise.then(function (resource) {
                        scope.status = resource.status;

                        timeout.cancel(scope.timer);
                        scope.timer = timeout(function () {
                            scope.ready = true;
                        }, 1500);
                    });

                    interval(function () {
                        scope.style.main.paddingTop = reference.header.outerHeight();
                    }, 1000);
                });
            }
        ]);
    }
)(kicl);