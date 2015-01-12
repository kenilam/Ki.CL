(
    function (app) {
        'use strict';
        
        app
            .controller('footer',
                [
                    '$rootScope', '$scope', '$timeout', '$element', 'tween',
                    function (root, scope, timeout, elm, tween) {
                        var ref = {
                            tooltip : elm.children('.tooltip')
                        };

                        scope.triggered = true;

                        scope.timer = {};

                        scope.style = {};

                        root.resource.$promise.then(function (resource) {
                            scope.resource = resource.initial.footer;

                            scope.$broadcast('sitemap', {
                                sitemap : _.rest(resource.content)
                            });

                            scope.timer.trigger = timeout(function () {
                                ref.minHieght = ref.tooltip.outerHeight();
                                ref.maxHeight = elm.height();

                                scope.render = function (condition) {
                                    scope.triggered = Boolean(condition);

                                    tween(
                                        elm,
                                        parseFloat(elm.css('transition-duration').split(', ')[0]),
                                        parseFloat(elm.css('transition-delay').split(', ')[0]),
                                        {
                                            height : scope.triggered ? ref.maxHeight : ref.minHieght
                                        }
                                    )();
                                };

                                scope.timer.render = timeout(scope.render, scope.resource.hide.delay);
                            }, 2000);
                        });
                    }
                ]
            );
    }
)(kicl);