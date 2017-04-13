(function experiments () {
	'use strict';

	var dependencies = [
			'view.experiments.experiment'
		],

		ref = {};

	angular
		.module('view.experiments', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					name : 'experiments',
					url : '/experiments',
					resolve : {
						resource: ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/experiments/experiments.json' }).get().$promise;
							}

							return ref.resource;
						}]
					},
					views : {
						'section' : {
							templateUrl : 'app/view/experiments/experiments.html',
							controller : 'view.experiments.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('experiments', { name : 'experiments', route : 'experiments' });
			}
		])
		.service('view.experiments.navigation', [
			'$timeout',
			'sitemap',
			function (timeout, sitemap) {
				var scope,
					timer,
					listTimer;

				this.update = function () {
					timeout.cancel(timer);
					timer = timeout(function () {
						scope.$broadcast('view.experiments.component.navigation.update.list', 'experiments');
					}, 100);

					timeout.cancel(listTimer);
					listTimer = timeout(function () {
						scope.experiments = sitemap.get('experiments');
					}, 500);
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.hideList = true;
				};
			}
		])
		.controller('view.experiments.controller', [
			'$rootScope',
			'$scope',
			'resource',
			'view.experiments.navigation',
			function controller (root, scope, resource, navigation) {
				navigation.assign(scope);
				navigation.update();

				scope.content = resource.content;
				scope.name = resource.name;
				scope.route = resource.route;

				scope.$emit('update.view.data', { name : resource.name, route : resource.route });

				scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
					if (toState.name === 'experiments') {
						scope.$emit('update.view.data', { name : resource.name, route : resource.route });
					}
				});

				scope.$on('$stateChangeSuccess', function (event, toState, toStateParams) {
					if (toState.name === 'experiments.experiment') {
						scope.current = toStateParams.experiment;

						return;
					}

					delete scope.current;
				});

				root.$broadcast('globalHeader.show');
			}
		]);
}());