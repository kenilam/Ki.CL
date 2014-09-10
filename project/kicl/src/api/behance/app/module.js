var behance = angular.module(
    'behance',
    [
        'ui.router',
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'ngSanitize'
    ]
).constant(
    'behance', {
        'data' : {
            'resource' : 'api/behance/data/resource.json'
        }
    }
)