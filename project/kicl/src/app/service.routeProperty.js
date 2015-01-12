(
    function (app) {
        'use strict';
        
        app
            .service(
                'routeProperty',
                [   'config',
                    function (config) {
                        return function (data, returnChildren) {
                            var route = _.rest(config.route.map.split('/:')),
                                property = function (data) {
                                    return _.map(data, function (node) {
                                        var list = {
                                                name : node.name
                                            },
                                            ref = {};

                                        if (node.link) list.link = node.link;

                                        if (node.route) {
                                            ref.state = [];
                                            ref.name = [];

                                            list.state = {};

                                            _.map(node.route.split('/'), function (r, k) {
                                                ref.state.push(route[k]);
                                                ref.name.push(route[k] + ':"' + r + '"');

                                                list.state[route[k]] = r;
                                            });

                                            list.route = ref.state.join('.') + '({' + ref.name.join(',') + '})';
                                        }

                                        if (returnChildren && node.children && node.children.length) {
                                            list.children = property(node.children);
                                        }

                                        return list;
                                    });
                                };

                            return property(data);
                        };
                    }
                ]
            );
    }
)(kicl);