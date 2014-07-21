"use strict";
(
    function (app) {
        app.controller('footer', [
            '$rootScope', '$scope',
            function (root, scope) {
                root.resource.$promise.then(function (resource) {
                    scope.navigation = _.rest(resource.content);
                });
            }
        ]);
    }
)(kicl);