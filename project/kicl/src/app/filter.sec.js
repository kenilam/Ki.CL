(
    function (app) {
        'use strict';
        
        app
            .filter('sec', [
                '$sec',
                function (sec) {
                    return function (string) {
                        return sce.trustAsHtml(string);
                    };
                }
            ]);
    }
)(kicl);