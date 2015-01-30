(
    function (app) {
        'use strict';
        
        app
            .controller('footer',
                [
                    '$rootScope', '$scope',
                    function (root, scope) {
                        root.resource.$promise.then(function (resource) {
                            scope.$broadcast('navigation', {
                                navigation : _.rest(resource.content)
                            });
                        });
                    }
                ]
            );
    }
)(kicl);