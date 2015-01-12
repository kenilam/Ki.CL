(
    function (app) {
        'use strict';
        
        app
            .service(
                'async',
                [
                    '$resource',
                    function (resource) {
                        return function (arg) {
                            return resource(
                                arg.url + (arg.path ? arg.path: ''),
                                arg.credent,
                                {
                                    'get':      {params : arg.params, method:'GET'},
                                    'post':     {params : arg.params, method:'POST'},
                                    'put':      {params : arg.params, method:'PUT'},
                                    'query':    {params : arg.params, method:'GET', isArray:true},
                                    'delete':   {params : arg.params, method:'DELETE'},
                                    'jsonp':    {params : arg.params, method:'JSONP'}
                                }
                            );
                        };
                    }
                ]
            );
    }
)(kicl);