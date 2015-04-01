(
	function init (app) {
		'use strict';

		app
			.controller('configRouterStateController',
				[
					'$rootScope', '$scope', '$state', '$stateParams', 'content',
					function configRouterStateController (root, scope, state, stateParams, content) {
						scope.content = content;

						if (content && content.children) {
							scope.navigation = content.children;
						}
					}
				]
			)
			.factory('configRouterTemplate',
				[
					'config',
					function configRouterTemplate (config) {
						var route = config.route,
							routes = _.rest(route.map.split('/:')),
							stateRef = {};

						function page (idx) {
							return stateRef[routes[idx]] ? routes[idx] : page(idx - 1);
						}

						function setTempalte (state) {
							stateRef = state;

							return 'view/' + state.section + '/' + page(routes.length - 1) + '.html';
						}

						return setTempalte;
					}
				]
			)
			.factory('configRouterResolve',
				[
					function configRouterResolve () {
						function setContent (stateParams) {
							function whenSetContent (resource) {
								var ctn = _.findWhere(resource.content, { route : _.toArray(stateParams).join('/') }),
									subCtn;

								if (!ctn) {
									_.each(resource.content, function (content) {
										if (content.children) subCtn = setContent(content.children);
										if (subCtn) ctn = subCtn;
									});
								}

								return ctn;
							}

							return whenSetContent;
						}

						function whenResolve (root, state, stateParams) {
							return root.resource.$promise.then(setContent(stateParams));
						}

						return {
							content : ['$rootScope', '$state', '$stateParams', whenResolve]
						};
					}
				]
			)
			.factory('configRouterState',
				[
					'configRouterTemplate', 'configRouterResolve', 'config',
					function (configRouterTemplate, configRouterResolve, config) {
						var routes = _.rest(config.route.map.split('/:'));

						function setEachState (stateProvider) {
							return function whileSetEachState (route, key) {
								stateProvider.state(
									routes.slice(0, key + 1).join('.'),
									{
										url : '/:' + route,
										views : {
											'view' : {
												templateUrl : configRouterTemplate,
												resolve : configRouterResolve,
												controller : 'configRouterStateController'
											}
										}
									}
								);
							};
						}

						return function setState (stateProvider) {
							_.each(routes, setEachState(stateProvider));
						};
					}
				]
			)
			.config(
				[
					'$locationProvider', '$stateProvider', '$urlRouterProvider', 'configRouterStateProvider', 'config',
					function configScope (locationProvider, stateProvider, urlRouterProvider, configRouterStateProvider, config) {
						locationProvider.hashPrefix('!');

						configRouterStateProvider.$get()(stateProvider);

						urlRouterProvider.otherwise(config.route.index);
					}
				]
			);
	}
)(kicl);
