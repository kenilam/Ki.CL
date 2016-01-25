(function async () {
	'use strict';

	var service = [
		'$rootScope',
		function statechange (root) {
			function WhenChange (scope, state) {
				var self = this;

				function whileChange (event, toState, toParams, fromState, fromParams, error) {
					if (toState.name === self.state.name) {
						self.onEnter(toState, fromState);
					}
				}

				function whileDestroy () {
					self.onExit();
				}

				self.state = state;

				self.when = function (callback) {
					if (!callback) {
						return;
					}

					if (callback.onEnter) {
						self.onEnter = callback.onEnter;
					}

					if (callback.onExit) {
						self.onExit = callback.onExit;
					}
				};

				scope.$on('$stateChangeSuccess', whileChange);
				scope.$on('$destroy', whileDestroy);
			}

			function init (scope, state) {
				return new WhenChange(scope, state);
			}

			return init;
		}
	];

	angular.module('service.statechange', [])
		.service('statechange', service);
}());
