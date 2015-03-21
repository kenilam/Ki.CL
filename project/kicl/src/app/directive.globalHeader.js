(
    function init (app) {
        'use strict';
        
        app
            .service('globalHeader_link',
                [
                    '$rootScope',
                    'resize',
                    function link (root, resize) {
                        return function trigger (scope, elm) {
                            root.resource.$promise.then(function promise (resource) {
                                scope.globalHeader = {
                                    resize : resize('globalHeader', scope, elm),
                                    watcher : {
                                        navigation : scope.$broadcast('navigation', {
                                            navigation : _.rest(resource.content)
                                        })
                                    }
                                };
                                
                                scope.$broadcast('navigation', {
                                    navigation : _.rest(resource.content)
                                });
                            });
                        };
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
                            scope : {
                                'isolate' : '&'
                            },
                            templateUrl: 'partial/globalHeader.html',
                            link: link
                        };
                    }
                ]
            );
    }
)(kicl);
