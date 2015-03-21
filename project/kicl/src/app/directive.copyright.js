(
    function init (app) {
        'use strict';
        
        app
            .service('copyright_link',
                [
                    '$rootScope', '$interpolate',
                    function link (root, interpolate) {
                        return function trigger (scope, elm) {
                            root.resource.$promise.then(function promise (resource) {
                                scope.copyright = {
                                    message : interpolate(resource.component.copyright.message)({ year : (new Date()).getFullYear() })
                                };
                            });
                        };
                    }
                ]
            )
            .directive('copyright',
                [
                    'copyright_link',
                    function directive (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'partial/copyright.html',
                            link : link
                        };
                    }
                ]
            );
    }
)(kicl);
