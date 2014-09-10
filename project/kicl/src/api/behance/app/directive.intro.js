(
    function (app) {
        app.directive('behanceIntro', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'api/behance/template/intro.html',
                controller: [
                    '$rootScope', '$scope',
                    function (root, scope) {
                        root.api.behance.resource.$promise.then(function () {
                            if (!root.api.behance.resource.profile) {
                                root.api.behance.resource.profile = root.api.behance.profile();
                            };
                            
                            root.api.behance.resource.profile.$promise.then(function (data) {
                                scope.intro = {
                                    about : data.user.sections.About.split('\n').filter(function (a) {return a;})
                                };
                            });
                        });
                    }
                ]
            }
        });
    }
)(behance);
