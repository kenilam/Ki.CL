'use strict';

describe('config', function () {
    describe('stateProvider', function () {
        var stateProviders = [
                {
                    'route' : { 'section' : 'home'},
                    'templateURL' : 'view/home/section.html',
                    'element' : '<h2>{{content.resource.heading}}</h2><behance-intro></behance-intro>',
                    'content' : {
                        'name' : 'Home',
                        'route' : 'home',
                        'resource' : {
                            'heading' : 'Welcome to Ki.CL'
                        }
                    }
                },
                {
                    'route' : { 'section' : 'about'},
                    'templateURL' : 'view/about/section.html',
                    'element' : '<h2>work</h2><section ui-view="view"></section><behance-projects data-behance-projects-route="section.page"></behance-projects>',
                    'content' : {
                        'name' : 'About',
                        'route' : 'about'
                    }
                },
                {
                    'route' : { 'section' : 'work'},
                    'templateURL' : 'view/work/section.html',
                    'element' : '<h2>work</h2><section ui-view="view"></section><behance-projects data-behance-projects-route="section.page"></behance-projects>',
                    'content' : {
                        'name' : 'Work',
                        'route' : 'work'
                    }
                },
                {
                    'route' : { 'section' : 'work', 'page' : '12345678'},
                    'templateURL' : 'view/work/page.html',
                    'element' : '<h2>work</h2><section ui-view="view"></section><behance-projects data-behance-projects-route="section.page"></behance-projects>',
                    'content' : {}
                },
                {
                    'route' : { 'section' : 'contact'},
                    'templateURL' : 'view/contact/section.html',
                    'element' : '',
                    'content' : {
                        'name' : 'Contact',
                        'route' : 'contact'
                    }
                }
            ],
            expectedValue = function (ref) {
                return function (route) {
                    var routeName = ref.routeExp;

                    for (var i = 0, l = ref.routeName.length; i < l; i ++) {
                        name = ref.routeName[i];

                        routeName += '/';

                        if (route[name]) {
                            routeName += route[name];
                        }
                    }

                    return routeName;
                }
            };

        beforeEach(function () {
            module('kicl');

            inject(
                function ($injector) {
                    this.root = $injector.get('$rootScope');
                    this.location = $injector.get('$location');
                    this.state = $injector.get('$state');
                    this.urlRouter = $injector.get('$urlRouter');
                    this.templateCache = $injector.get('$templateCache');
                    this.controller = $injector.get('$controller')
                    this.config = $injector.get('config');
                    this.httpBackend = $injector.get('$httpBackend');

                    this.route = this.config.route.map.substr(2).replace(/\/:/g, '.');
                    this.routeExp = '#!';
                    this.routeName = this.route.split('.');

                    this.expectedRoute = expectedValue({ routeExp : this.routeExp, routeName : this.routeName});

                    this.httpBackend
                        .when('GET', 'http://localhost:9876/data/resource.json')
                            .respond({
                                name : 'Ki.CL',
                                route : 'section({section : "home"})'
                            });

                    this.httpBackend
                        .when('GET', 'api/behance/data/resource.json')
                            .respond({
                                name : 'Ki.CL',
                                route : 'section({section : "home"})'
                            });

                    for (var i = 0, l = stateProviders.length; i < l; i ++) {
                        var stateProvider = stateProviders[i];

                        this.templateCache.put(stateProvider.templateURL, stateProvider.element);
                    }
                }
            )
        });
        
        afterEach(function() {
            this.httpBackend.verifyNoOutstandingExpectation();
            this.httpBackend.verifyNoOutstandingRequest();
        });

        for (var i = 0, l = stateProviders.length; i < l; i ++) {
            (function (stateProvider) {
                it(stateProvider.templateURL + ' should binds the content to the scope', function () {
                    var scope = this.root.$new();

                    this.httpBackend.flush();

                    this.controller('configRouter', {
                        $rootScope : this.root,
                        $scope : scope,
                        $state : this.state,
                        $stateParams : this.stateParams,
                        content : stateProvider.content
                    });

                    expect(scope.content).toEqual(stateProvider.content);
                });

                it('should resolves the content dependency', inject(function (config) {
                    var scope = this.root.$new(),
                        state = this.state.get(this.expectedRoute(stateProvider.route));
                    
                    this.httpBackend.flush();
                }));
            }(stateProviders[i]));
        }
    })
});

