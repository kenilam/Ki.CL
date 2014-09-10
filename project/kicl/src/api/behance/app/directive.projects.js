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
                    '$rootScope', '$scope', '$stateParams', 'config',
                    function (root, scope, stateParams, config) {
                        var key = _.keys(stateParams),
                            route = _.first(
                                _.difference(
                                    _.rest(config.route.map.split('/:')),
                                    key
                                )
                            );

                        root.api.behance.resource.$promise.then(function (resource) {
                            scope.resource = resource.widget.projects;
                            scope.resource.userName = resource.userName;

                            if (!root.api.behance.resource.projects) {
                                root.api.behance.resource.projects = root.api.behance.projects();
                            };

                            root.api.behance.resource.projects.$promise.then(function (data) {
                                scope.projects = _.map(data.projects, function (project) {
                                    project.route = key.join('.') + '.' + route + '({' + route + ':"' + project.id + '"})';
                                    return project;
                                });
                            });
                        });
                    }
                ]
            }
        });
    }
)(behance);
