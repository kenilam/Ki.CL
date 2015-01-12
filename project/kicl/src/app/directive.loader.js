(
    function (app) {
        'use strict';
        
        app
            .directive('loader',
                [
                    function () {
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
