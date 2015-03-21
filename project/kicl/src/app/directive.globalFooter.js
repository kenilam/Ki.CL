(
    function init (app) {
        'use strict';
        
        app
            .service('globalFooter_link', 
                [
                    '$rootScope',
                    'resize',
                    function link (root, resize) {
                        return function trigger (scope, elm) {
                            root.resource.$promise.then(function promise (resource) {
                                scope.globalFooter = {
                                    resize : resize('globalFooter', scope, elm),
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
            .directive('globalFooter',
                [
                    'globalFooter_link',
                    function directive (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            scope : {
                                'isolate' : '&'
                            },
                            templateUrl: 'partial/globalFooter.html',
                            link: link
                        };
                    }
                ]
            );
    }
)(kicl);
