(function app () {
	'use strict';
	
	var dependency = [
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
			'$rootScope',
			'$timeout', '$state',
			'$stateParams',
			'$window',
			'async',
			'resource',
			'index',
			'sitemap',
			function run (root, timeout, state, stateParams, win, async, resource, index, sitemap) {
				function init () {
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
						root.timer.resourceReady = timeout(whenResourceReady, 0);
					}

					function whenInit () {
						root.status.route = state.current.name || index;

						root.$broadcast('resource.throbber.show');
						
						async({url: resource}).get().$promise.then(resourceReady);
					}

					return whenInit;
				}

				function stateChangeStart () {
					function whenStateChangeStart (event, toState, toParams, fromState, fromParams, error) {
						root.status.stateIsChanging = true;

						if (!root.$$phase) {
							root.$apply();
						}
					}

					return whenStateChangeStart;
				}

				function stateChangeSuccess () {
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

						updateRoute(root, sitemap, timeout)();

						if (!root.$$phase) {
							root.$apply();
						}
					}

					return whenStateChangeSuccess;
				}

				function stateChangeError () {
					function whenStateChangeError (error) {
						console.error(error);
					}

					return whenStateChangeError;
				}

				function updateRoute () {
					var route = [],
						title = [];

					function currentRoute (current) {
						if (!current) {
							current = sitemap.current();
						}

						if (current.parent && !current.root) {
							currentRoute(current.parent);
						}

						if (!current.route && current.root) {
						
							if (!root.$$phase) {
								root.$apply();
							}
							
							return;
						}

						if (current.route) {
							route.push(_.last(current.route.split('(')[0].split('.')));
							title.push(current.name);
						}

						root.status.route = route.join('.');
						root.status.title = title.join(' | ');

						if (!root.$$phase) {
							root.$apply();
						}
					}

					function whenUpdateRoute () {
						route = [];
						title = [];
						
						timeout.cancel(root.timer.updateRoute);
						root.timer.updateRoute = timeout(currentRoute, 0);
					}

					return whenUpdateRoute;
				}

				function updateViewProjectsCurrent (unset) {
					if (!root.ref.viewProjects) {
						root.ref.viewProjects = {};
					}

					function whenUpdateCurrent (event, current) {
						if (unset) {
							delete root.ref.viewProjects.current;

							return;
						}

						root.ref.viewProjects.current = current;

						if (!root.$$phase) {
							root.$apply();
						}
					}

					return whenUpdateCurrent;
				}

				function updateHeight (target) {
					function update (event, height) {
						root.ref[target].height = height;
						
						if (!root.$$phase) {
							root.$apply();
						}
					}

					if (!root.ref[target]) {
						root.ref[target] = {};
					}

					return update;
				}

				root.status = {};
				root.ref = {};
				root.timer = {};
				root.control = {};

				root.$on('sitemap.current.updated', updateRoute());
				
				root.$on('view.projects.set.current', updateViewProjectsCurrent());
				root.$on('view.projects.unset.current', updateViewProjectsCurrent(true));

				root.$on('$stateChangeStart', stateChangeStart());
				root.$on('$stateChangeSuccess', stateChangeSuccess());
				root.$on('$stateChangeError', stateChangeError());

				root.$on('globalHeader.height', updateHeight('globalHeader'));
				root.$on('globalFooter.height', updateHeight('globalFooter'));

				root.timer.init = timeout(init(), 0);
			}
		];

	angular
		.module('kicl', dependency)
		.constant('resource', constant.resource)
		.constant('index', constant.index)
		.config(config)
		.run(run);
}());