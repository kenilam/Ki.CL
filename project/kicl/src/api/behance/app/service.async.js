(
    function (app) {
        'use strict';
        
        app
            .service(
                'behanceAsync',
                [
                    '$resource', '$timeout',
                    function (resource, timeout) {
                        return function (url, api_key) {
                            return function (arg) {
                                if (!arg.params) {
                                    arg.params = {};
                                }
                                arg.params.api_key = api_key;
                                arg.params.callback = 'JSON_CALLBACK';
                                
                                return resource(
                                    url + '/' + (arg.path ? arg.path: ''),
                                    arg.credent,
                                    {
                                        'post':     {params : arg.params, method:'POST'},
                                        'put':      {params : arg.params, method:'PUT'},
                                        'jsonp':    {params : arg.params, method:'JSONP'}
                                    }
                                );
                            };
                        };
                    }
                ]
            );
    }
)(behance);
