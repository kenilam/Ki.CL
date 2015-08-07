(function app () {
	'use strict';
	
	var callback = {
			stateChangeStart : function (root) {
				function whenStateChangeStart (event, toState, toParams, fromState, fromParams, error) {
					root.status.init = true;
				}

				return whenStateChangeStart;
			},
			stateChangeSuccess : function (root, sitemap, timeout) {
				function unsetInit () {
					root.status.init = false;
				}
				
				function whenStateChangeSuccess (event, toState, toParams, fromState, fromParams, error) {
					var state = toState.name.split('.'),
						currentState = _.last(state),
						currentStateMap = toState.name.replace('.' + currentState, ''),
						paramsKey = _.keys(toParams),
						sitemapId = paramsKey.length ? toParams[currentState] : currentState,
						sitemapMap = paramsKey.length > 0 ? currentStateMap : 'root';

					timeout.cancel(root.timer.stateChangeSuccess);
					root.timer.stateChangeSuccess = timeout(unsetInit, 500);

					if (sitemap.get(sitemapId, sitemapMap)) {
						sitemap.current(sitemapId, sitemapMap);
					}

					callback.updateRoute(root, sitemap, timeout)();
					callback.updateGlobalHeader(root)();
				}

				return whenStateChangeSuccess;
			},
			stateChangeError : function (event, toState, toParams, fromState, fromParams, error) {
				console.error(error);
			},
			globalHeaderExpanded : function (status) {
				function whenGlobalHeaderExpanded () {
					status.expanded = true;
				}

				return whenGlobalHeaderExpanded;
			},
			globalHeaderCollapsed : function (status) {
				function whenGlobalHeaderCollapsed () {
					delete status.expanded;
				}

				return whenGlobalHeaderCollapsed;
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
					root.timer.updateRoute = timeout(currentRoute, 500);
				}

				return whenUpdateRoute;
			},
			updateGlobalHeader : function (root) {
				function whenUpdateGlobalHeader () {
					root.$broadcast('globalHeader.collapse');
				}

				return whenUpdateGlobalHeader;
			},
			init : function (root, timeout, state, async, resource, index, sitemap) {
				function eachComponent (component, name) {
					root.$broadcast(name + '.data', component);
				}

				function resourceReady (data) {
					root.status.loading = false;

					root.$broadcast('resource.throbber.hide');
					_.each(data.component, eachComponent);
				}

				function afterInit () {
					delete root.status.init;
				}

				function whenInit () {
					root.status.route = state.current.name || index;

					timeout(afterInit, 500);

					root.$broadcast('resource.throbber.show');
					async({url: resource}).get().$promise.then(resourceReady);
				}

				return whenInit;
			}
		},
		dependency = [
			'ngAnimate',
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
			function configScope (locationProvider, urlRouterProvider, index, sitemap) {
				locationProvider.hashPrefix('!');
				urlRouterProvider.otherwise(index);
			}
		],
		run = [
			'$rootScope', '$timeout', '$state', 'async', 'resource', 'index', 'sitemap',
			function run (root, timeout, state, async, resource, index, sitemap) {
				root.status = {
					init : true,
					loading : true,
					globalHeader : {
						expanded: false
					}
				};

				root.timer = {};

				root.$on('sitemap.current.updated', callback.updateRoute(root, sitemap, timeout));
				root.$on('$stateChangeStart', callback.stateChangeStart(root));
				root.$on('$stateChangeSuccess', callback.stateChangeSuccess(root, sitemap, timeout));
				root.$on('$stateChangeError', callback.stateChangeError);
				
				root.$on('globalHeader.expanded', callback.globalHeaderExpanded(root.status.globalHeader));
				root.$on('globalHeader.collapsed', callback.globalHeaderCollapsed(root.status.globalHeader));

				timeout(callback.init(root, timeout, state, async, resource, index, sitemap), 500);
			}
		];

	angular
		.module('kicl', dependency)
		.constant('resource', constant.resource)
		.constant('index', constant.index)
		.config(config)
		.run(run);
}());
