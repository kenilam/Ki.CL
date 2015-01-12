(
    function (app) {
        'use strict';
        
        app
            .run(
                [
                    '$rootScope', '$state', '$stateParams', '$resource', 'behance', 'behanceAsync',
                    function(root, state, stateParams, resource, behance, async) {
                        var replaceExp = function (exp, userName, projectId) {
                                return exp
                                    .replace(':userName', userName)
                                    .replace(':projectId', projectId);
                            },
                            projectId

                        if (!root.api) {
                            root.api = {}
                        }

                        root.api.behance = {
                            resource : resource(behance.data.resource).get()
                        }

                        root.api.behance.resource.$promise.then(function (data) {
                            root.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                                projectId = _.last(_.toArray(toParams));

                                _.each(data.widget, function (config, name) {
                                    root.api.behance[name] = async(data.baseUrl + '/' + data.version, data.apiKey)
                                        (
                                            {
                                                path : replaceExp(config.path, data.userName, projectId),
                                                params : _.object(
                                                    _.map(
                                                        config.params, function (param, name) {
                                                            return [name, replaceExp(param, data.userName, projectId)]
                                                        }
                                                    )
                                                )
                                            }
                                        ).jsonp
                                })
                            })
                        })
                    }
                ]
            )
    }
)(behance)