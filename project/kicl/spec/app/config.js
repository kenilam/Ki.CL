describe('config', function () {
    var contents = [
            {
                route : {section : 'home'},
                templateURL : 'view/home/section.html',
                element : '<h2>{{content.resource.heading}}</h2><behance-intro></behance-intro>'
            },
            {
                route : {section : 'work'},
                templateURL : 'view/work/section.html',
                element : '<h2>work</h2><section ui-view="view"></section><behance-projects data-behance-projects-route="section.page"></behance-projects>'
            },
            {
                route : {section : 'work', page : '12345678'},
                templateURL : 'view/work/page.html',
                element : '<h2>work</h2><section ui-view="view"></section><behance-projects data-behance-projects-route="section.page"></behance-projects>'
            },
            {
                route : {section : 'contact'},
                templateURL : 'view/contact/section.html',
                element : ''
            }
        ],
        contentMock,
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
        module('kicl', function($provide) {
            $provide.value('content', contentMock = {});
        });

        inject(
            function ($injector) {
                this.root = $injector.get('$rootScope');
                this.location = $injector.get('$location');
                this.state = $injector.get('$state');
                this.urlRouter = $injector.get('$urlRouter');
                this.templateCache = $injector.get('$templateCache');
                this.config = $injector.get('config');
                this.httpBackend = $injector.get('$httpBackend');

                this.route = this.config.route.map.substr(2).replace(/\/:/g, '.');
                this.routeExp = '#!';
                this.routeName = this.route.split('.');

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

                for (var i = 0, l = contents.length; i < l; i ++) {
                    var content = contents[i];

                    this.templateCache.put(content.templateURL, content.element);
                }
            }
        )
    });
    
    afterEach(function() {
        this.httpBackend.verifyNoOutstandingExpectation();
        this.httpBackend.verifyNoOutstandingRequest();
    });

    for (var i = 0, l = contents.length; i < l; i ++) {
        (function (content) {
            it(content.templateURL + ' should route', function () {
                var value = expectedValue({
                        routeExp : this.routeExp,
                        routeName : this.routeName
                    })(content.route);

                this.httpBackend.flush();

                expect(this.state.href(this.route, content.route)).toEqual(value);
            });

            it(content.templateURL + ' should resolve data', function() {
                console.log(contentMock)

                contentMock
                this.httpBackend.flush();

                this.state.go(this.route, content.route);
                this.root.$digest();

            });
        }(contents[i]));
    }
});

