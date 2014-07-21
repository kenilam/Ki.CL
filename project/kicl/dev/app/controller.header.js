"use strict";
(
    function (app) {
        app.controller('header', [
            '$rootScope', '$scope',
            function (root, scope) {
                root.resource.$promise.then(function (resource) {
                    scope.navigation = _.rest(resource.content);
                });
            }
        ]);
    }
)(kicl);