(function app () {
	'use strict';
	
	var callback = {
			stateChangeStart : function (root) {
				function whenStateChangeStart (event, toState, toParams, fromState, fromParams, error) {
					root.status.stateIsChanging = true;
				}

				return whenStateChangeStart;
			},
			stateChangeSuccess : function (root, sitemap, timeout, anchorScroll) {
				function whenStateChangeSuccess (event, toState, toParams, fromState, fromParams, error) {
					var state = toState.name.split('.'),
						currentState = _.last(state),
						currentStateMap = toState.name.replace('.' + currentState, ''),
						paramsKey = _.keys(toParams),
						sitemapId = paramsKey.length ? toParams[currentState] : currentState,
						sitemapMap = paramsKey.length > 0 ? currentStateMap : 'root';

					delete root.status.stateIsChanging;

					if (sitemap.get(sitemapId, sitemapMap)) {
						sitemap.current(sitemapId, sitemapMap);
					}

					if (fromState.name) {
						root.status.fromRoute = fromState.name;
					}

					callback.updateRoute(root, sitemap, timeout)();
					
					anchorScroll();
				}

				return whenStateChangeSuccess;
			},
			stateChangeError : function (event, toState, toParams, fromState, fromParams, error) {
				console.error(error);
			},
			updateRoute : function (root, sitemap, timeout) {
				function currentRoute (current) {
					var route = [],
						title = [];

					if (!current) {
						current = sitemap.current();
					}

					if (current.parent && !current.root) {
						currentRoute(current.parent);
					}

					if (!current.route && current.root) {
						return;
					}

					if (current.route) {
						route.push(current.route.split('(')[0]);
						title.push(current.name);
					}

					root.status.route = route.join('.');
					root.status.title = title.join(' | ');
				}

				function whenUpdateRoute () {
					timeout.cancel(root.timer.updateRoute);
					root.timer.updateRoute = timeout(currentRoute, 0);
				}

				return whenUpdateRoute;
			},
			globalHeaderHeight : function (root) {
				root.ref.globalHeader = {};
				root.ref.globalHeader.height = 0;

				function setValue (event, height) {
					root.ref.globalHeader.height = height;
				}

				return setValue;
			},
			globalFooterHeight : function (root) {
				root.ref.globalFooter = {};
				root.ref.globalFooter.height = 0;

				function setValue (event, height) {
					root.ref.globalFooter.height = height;
				}

				return setValue;
			},
			breadcrumbHeight : function (root) {
				root.ref.breadcrumb = {};
				root.ref.breadcrumb.height = 0;

				function setValue (event, height) {
					root.ref.breadcrumb.height = height;
				}

				return setValue;
			},
			resize : function (root, timeout, stateParams) {
				var udpateMainHeight = update.main.height(root, timeout, stateParams);

				function whenResize () {
					var height = get.main.height(stateParams);

					udpateMainHeight(height);

					root.$apply();
				}

				return whenResize;
			},
			init : function (root, timeout, state, async, resource, index, sitemap) {
				function eachComponent (component, name) {
					root.$broadcast(name + '.data', component);
				}

				function resourceReady (data) {
					root.status.loading = true;

					function whenResourceReady () {
						root.status.loading = false;

						root.$broadcast('resource.throbber.hide');

						_.each(data.component, eachComponent);
					}

					timeout.cancel(root.timer.resourceReady);
					root.timer.resourceReady = timeout(whenResourceReady, 500);
				}

				function whenInit () {
					root.status.route = state.current.name || index;

					root.$broadcast('resource.throbber.show');
					
					async({url: resource}).get().$promise.then(resourceReady);
				}

				return whenInit;
			}
		},
		get = {
			main : {
				height : function (stateParams) {
					var mainHeight = angular.element('main').outerHeight(),
						projectHeight = angular.element('[ui-view=project]').outerHeight(),
						projectTop = parseInt(angular.element('[ui-view=project]').css('top'));

					if (stateParams.project && projectHeight > mainHeight) {
						return projectHeight + projectTop;
					}

					return mainHeight;
				}
			}
		},
		update = {
			main : {
				height : function (root, timeout, stateParams) {
					var pendding = 800;

					root.ref.main = {};

					function assign () {
						root.ref.main.height = get.main.height(stateParams);
					}

					function delay () {
						assign();
					}

					function trigger () {
						assign();
						
						timeout.cancel(root.timer.updateMainHeight);
						root.timer.updateMainHeight = timeout(delay, pendding);
					}

					return trigger;
				}
			}
		},
		dependency = [
			'ngAnimate',
			'ngAria',
			'ngRoute',
			'ngResource',
			'ngSanitize',
			'ui.router',

			'factory',
			'service',
			'view',
			'component',

			'api'
		],
		constant = {
			'resource' : '/data/resource.json',
			'index' : 'home'
		},
		config = [
			'$locationProvider',
			'$urlRouterProvider',
			'index',
			function configScope (locationProvider, urlRouterProvider, index) {
				locationProvider.hashPrefix('!');
				urlRouterProvider.otherwise(index);
			}
		],
		run = [
			'$rootScope', '$timeout', '$state', '$stateParams', '$anchorScroll', '$window', 'async', 'resource', 'index', 'sitemap',
			function run (root, timeout, state, stateParams, anchorScroll, win, async, resource, index, sitemap) {
				root.status = {};
				root.ref = {};
				root.timer = {};

				root.$on('sitemap.current.updated', callback.updateRoute(root, sitemap, timeout));
				root.$on('$stateChangeStart', callback.stateChangeStart(root));
				root.$on('$stateChangeSuccess', callback.stateChangeSuccess(root, sitemap, timeout, anchorScroll));
				root.$on('$stateChangeError', callback.stateChangeError);
				
				root.$on('globalHeader.height', callback.globalHeaderHeight(root));
				root.$on('globalFooter.height', callback.globalFooterHeight(root));
				root.$on('breadcrumb.height', callback.breadcrumbHeight(root));

				root.$on('main.update.height', update.main.height(root, timeout, stateParams));

				root.timer.init = timeout(callback.init(root, timeout, state, async, resource, index, sitemap), 0);

				root.$watch(get.main.height, update.main.height(root, timeout, stateParams));

				angular.element(win).bind('resize', callback.resize(root, timeout, stateParams));
			}
		];

	angular
		.module('kicl', dependency)
		.constant('resource', constant.resource)
		.constant('index', constant.index)
		.config(config)
		.run(run);
}());
