(
    function (app) {
        'use strict';
        
        app
            .run(
                [
                    '$rootScope', '$state', '$stateParams', 'async', 'config',
                    function(root, state, stateParams, async, config) {
                        root.info = {
                            protocol : location.protocol,
                            host : location.hostname,
                            port : location.port
                        };

                        root.helper = {
                            _ : _,
                            moment : moment
                        };
                        
                        root.resource = async({
                            url: root.info.protocol + '//' + root.info.host + ':' + root.info.port,
                            path: config.data.resource
                        }).get();
                        
                        root.$state = state;
                        root.$stateParams = stateParams;
                    }
                ]
            );
    }
)(kicl);