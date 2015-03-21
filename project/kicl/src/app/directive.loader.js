(
    function init (app) {
        'use strict';
        
        app
            .directive('loader',
                [
                    function directive () {
                        return {
                            restrict: 'AE',
                            replace: true,
                            scope : {
                                'isolate' : '&'
                            },
                            templateUrl: 'partial/loader.html'
                        };
                    }
                ]
            );
    }
)(kicl);
