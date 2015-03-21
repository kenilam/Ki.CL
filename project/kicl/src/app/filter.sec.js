(
    function init (app) {
        'use strict';
        
        app
            .filter('sec',
                [
                    '$sec',
                    function filter (sec) {
                        return function trigger (string) {
                            return sce.trustAsHtml(string);
                        };
                    }
                ]
            );
    }
)(kicl);