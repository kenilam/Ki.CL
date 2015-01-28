(
    function (app) {
        'use strict';
        
        app
            .service('copyright_link',
                [
                    '$rootScope',
                    '$interpolate',
                    function (root, interpolate) {
                        return function (scope, elm) {
                            root.resource.$promise.then(function (resource) {
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
                    function (link) {
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
