(
    function init (app) {
        'use strict';
        
        app
            .service('socialNetwork_link',
                [
                    '$rootScope', 'config',
                    function link (root, config) {
                        return function trigger (scope, elm) {
                            root.resource.$promise.then(function promise (resource) {
                                scope.socialNetwork = resource.socialNetwork;
                            });
                        };
                    }
                ]
            )
            .directive('socialNetwork',
                [
                    'socialNetwork_link',
                    function directive (link) {
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
