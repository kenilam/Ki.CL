"use strict";
var kicl = angular.module(
    'kicl',
    [
        'ui.router',
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'ngSanitize'
    ]
).constant(
    'config', {
        'route' : {
            'map' : '/:section/:page/:item/:detail/:alternative',
            'index' : 'home'
        }
    }
);