"use strict";
(
    function (app) {
        app.controller('header', [
            '$rootScope', '$scope', '$state', '$stateParams',
            function (root, scope, state, stateParams) {
                root.resource.$promise.then(function (resource) {
                    scope.navigation = resource.content;
                });
            }
        ]);
    }
)(kicl);