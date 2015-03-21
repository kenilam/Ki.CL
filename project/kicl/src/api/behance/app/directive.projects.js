(
    function (app) {
        'use strict';
        
        app
            .service('behanceProjects_stateChangeSuccess',
                [
                    '$rootScope', '$stateParams',
                    function stateChangeSuccess (root, stateParams) {
                        return function trigger (scope) {
                            function setSelected (id) {
                                _.each(scope.projects, function eachProject (project) {
                                    delete project.selected;
                                });

                                if (id) {
                                    _.findWhere(scope.projects, { id : parseInt(id) }).selected = true;
                                }
                            }

                            function whenStateChangeSuccess (event, toState, toParams, fromState, fromParams) {
                                setSelected(toParams.page);
                            }

                            setSelected(stateParams.page);
                            return root.$on('$stateChangeSuccess', whenStateChangeSuccess);
                        };
                    }
                ]
            )
            .service('behanceProjects_link',
                [
                    '$rootScope', '$stateParams', 'behanceProjects_stateChangeSuccess', 'config',
                    function link (root, stateParams, stateChangeSuccess, config) {
                        return function trigger (scope, elm, attrs) {
                            var route = attrs.behanceProjectsRoute;

                            root.api.behance.resource.$promise.then(function behanceResource (resource) {
                                scope.resource = resource.widget.projects;
                                scope.resource.userName = resource.userName;

                                if (!root.api.behance.resource.projects) {
                                    root.api.behance.resource.projects = root.api.behance.projects();
                                }

                                root.api.behance.resource.projects.$promise.then(function projectResource (data) {
                                    scope.projects = _.map(data.projects, function (project) {
                                        project.route = route + '({' + _.last(route.split('.')) + ':"' + project.id + '"})';
                                        project.created_on = moment(new Date(project.created_on * 1000));
                                        project.published_on = moment(new Date(project.published_on * 1000));
                                        
                                        return project;
                                    });

                                    stateChangeSuccess(scope);
                                });
                            });
                        };
                    }
                ]
            )
            .directive('behanceProjects',
                [
                    'behanceProjects_link',
                    function behanceProjects (link) {
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
