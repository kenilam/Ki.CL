"use strict";
(
    function (app) {
        app.run(
            [
                '$rootScope', '$state', '$stateParams', 'async',
                function(root, state, stateParams, async) {
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

                    root.init = true;

                    root.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error){
                        
                    });

                    root.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error){
                        
                    });
                }
            ]
        );
    }
)(kicl);