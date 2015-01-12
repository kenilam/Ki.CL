(
    function (app) {
        'use strict';
        
        app
            .service('socialNetwork_link',
                [
                    '$rootScope',
                    'config',
                    function (root, config) {
                        return function (scope, elm) {
                            root.resource.$promise.then(function (resource) {
                                scope.socialNetwork = resource.socialNetwork;
                            });
                        };
                    }
                ]
            )
            .directive('socialNetwork',
                [
                    'socialNetwork_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            scope : {
                                'isolate' : '&'
                            },
                            templateUrl: 'partial/socialNetwork.html',
                            link : link
                        };
                    }
                ]
            );
    }
)(kicl);
