"use strict";
(
    function (app) {
        app.run(
            [
                '$rootScope', '$state', '$stateParams', '$urlRouter', 'async', 'config',
                function(root, state, stateParams, urlRouter, async, config) {
                    root.info = {
                        protocol : location.protocol,
                        host : location.hostname,
                        port : location.port
                    }

                    root.resource = async({
                        url: root.info.protocol + '//' + root.info.host + ':' + root.info.port,
                        path: '/data/resource.json'
                    }).get();
                    
                    root.$state = state;
                    root.$stateParams = stateParams;

                    root.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                        root.resource.$promise.then(function (resource) {
                            state.go(toState.name, {
                                views : {
                                    
                                }
                            });
                        });
                    });
                }
            ]
        );
    }
)(kicl);