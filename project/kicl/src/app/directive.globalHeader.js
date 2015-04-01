(
    function init (app) {
        'use strict';
        
        app
            .service('globalHeader_link',
                [
                    '$rootScope',
                    'resize',
                    function link (root, resize) {
                        function init (scope, elm) {
                            function whenInit (resource) {
                                scope.globalHeader = {
                                    resize : resize('globalHeader', scope, elm),
                                    watcher : {
                                        navigation : scope.$broadcast('navigation', {
                                            navigation : _.rest(resource.content)
                                        })
                                    }
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
            .directive('globalHeader',
                [
                    'globalHeader_link',
                    function directive (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'partial/globalHeader.html',
                            link: link
                        };
                    }
                ]
            );
    }
)(kicl);
