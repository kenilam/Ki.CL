(
    function (app) {
        'use strict';
        
        app
            .service('behanceProfile_link',
                [
                    '$rootScope',
                    function (root) {
                        return function (scope, elm) {
                            root.api.behance.resource.$promise.then(function () {
                                if (!root.api.behance.resource.profile) {
                                    root.api.behance.resource.profile = root.api.behance.profile();
                                }
                                
                                root.api.behance.resource.profile.$promise.then(function (data) {
                                    scope.profile = data.user;
                                });
                            });
                        };
                    }
                ]
            )
            .directive('behanceProfile',
                [
                    'behanceProfile_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'api/behance/template/profile.html',
                            link: link
                        };
                    }
                ]
            );
    }
)(behance);
