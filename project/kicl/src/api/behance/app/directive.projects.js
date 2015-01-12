(
    function (app) {
        'use strict';
        
        app
            .service('behanceProjects_link',
                [
                    '$rootScope', '$stateParams', 'config',
                    function (root, stateParams, config) {
                        return function (scope, elm, attrs) {
                            var route = attrs.behanceProjectsRoute,
                                currentProject;

                            root.api.behance.resource.$promise.then(function (resource) {
                                scope.resource = resource.widget.projects;
                                scope.resource.userName = resource.userName;

                                if (!root.api.behance.resource.projects) {
                                    root.api.behance.resource.projects = root.api.behance.projects();
                                }

                                root.api.behance.resource.projects.$promise.then(function (data) {
                                    scope.projects = _.map(data.projects, function (project) {
                                        return _.extend(project, {
                                            'route' : route + '({' + _.last(route.split('.')) + ':"' + project.id + '"})',
                                            'created_on' : moment(new Date(project.created_on * 1000)).fromNow()
                                        });
                                    });

                                    scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                                        currentProject = _.findWhere(scope.projects, { id : route });

                                        _.each(scope.projects, function (project) {
                                            delete project.selected;
                                        });

                                        if (currentProject) {
                                            currentProject.selected = true;
                                        }
                                    });
                                });
                            });
                        };
                    }
                ]
            )
            .directive('behanceProjects',
                [
                    'behanceProjects_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'api/behance/template/projects.html',
                            link : link
                        };
                    }
                ]
            );
    }
)(behance);
