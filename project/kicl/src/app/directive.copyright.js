(
    function init (app) {
        'use strict';
        
        app
            .service('copyright_link',
                [
                    '$rootScope', '$interpolate',
                    function link (root, interpolate) {
                        function init (scope, elm) {
                            function whenInit (resource) {
                                scope.copyright = {
                                    message : interpolate(resource.component.copyright.message)({ year : (new Date()).getFullYear() })
                                };
                            }

                            return whenInit;
                        }
                        
                        function trigger (scope, elm) {
                            root.resource.$promise.then(init(scope, elm));
                        }

                        return trigger;
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
