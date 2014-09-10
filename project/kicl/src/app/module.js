var kicl = angular.module(
    'kicl',
    [
        'ui.router',
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'behance'
    ]
).constant(
    'config', {
        'data' : {
            'resource' : '/data/resource.json'
        },
        'route' : {
            'map' : '/:section/:page/:item/:detail/:alternative',
            'index' : 'home'
        }
    }
);