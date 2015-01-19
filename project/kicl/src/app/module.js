var kicl = angular.module(
    'kicl',
    [
        'ui.router',
        'ct.ui.router.extras',
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