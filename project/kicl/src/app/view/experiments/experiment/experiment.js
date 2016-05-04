(function experiments () {
	'use strict';

	var dependencies = [
			'view.experiments.experiment.smoke',
			'view.experiments.experiment.cube',
		],

		ref = {};

	angular
		.module('view.experiments.experiment', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					'name' : 'experiments.experiment',
					'url' : '/:experiment',
					'views' : {
						'experiment' : {
							'templateUrl' : function (stateParams) {
								var experiment =  stateParams.experiment;

								return 'app/view/experiments/experiment/' + experiment + '/' + experiment + '.html';
							},
							'controller' : 'view.experiments.experiment.controller'
						}
					}
				});
			}
		])
		.service('view.experiments.experiment.resource', [
			'$stateParams',
			'async',
			function resource (stateParams, async) {
				var scope;

				var ref = {};

				function loaded (resource) {
					scope.content = resource.content;
					scope.name = resource.name;
					scope.route = resource.route;

					if (!ref[stateParams.experiment]) {
						ref[stateParams.experiment] = resource;
					}
				}

				this.load = function () {
					var experiment =  stateParams.experiment;

					if (ref[stateParams.experiment]) {
						loaded(ref[stateParams.experiment]);

						return;
					}

					async({ url : 'app/view/experiments/' + experiment + '/' + experiment + '.json' }).get().$promise.then(loaded);
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;
				};
			}
		])
		.controller('view.experiments.experiment.controller', [
			'$rootScope',
			'$scope',
			'view.experiments.experiment.resource',
			function controller (root, scope, resource) {
				resource.assign(scope);

				scope.$on('$stateChangeSuccess', function (event, toState) {
					if (toState.name !== 'experiments.experiment') {
						return;
					}

					resource.load();
				});

				scope.$emit('update.view.data', { name : 'experiments.experiment', route : 'experiments.experiment' });

				root.$broadcast('globalHeader.show');
			}
		]);
}());