(
    function (app) {
        app.directive('behanceProjects', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'api/behance/template/projects.html',
                controller: [
                    '$rootScope', '$scope',
                    function (root, scope) {
                        root.api.behance.resource.$promise.then(function (resource) {
                            scope.resource = resource.widget.projects;
                            root.api.behance.projects.jsonp().$promise.then(function (data) {
                                console.log(data.projects[0]);
                                scope.projects = data.projects;
                            });
                        });
                    }
                ]
            }
        });
    }
)(behance);
