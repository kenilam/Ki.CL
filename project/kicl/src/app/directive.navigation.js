(
	function init (app) {
		'use strict';

		var route,
			routeProp,
			root,
			timer,
			params,
			assign;

		function assigning (scope, elm) {
			scope.navigation = {
				list : {},
				state : {},
				timer : {}
			};

			function whenAssigning (data) {
				scope.navigation.list = routeProp(data.navigation);

				timer.cancel(scope.navigation.timer.route);
				scope.navigation.timer.route = timer(updateRoute(scope, elm), 0);

				root.$on('$stateChangeSuccess', stateChangeSuccess(scope, elm));
			}

			return whenAssigning;
		}

		function stateChangeSuccess (scope, elm) {
			function whenStateChangeSuccess (event, toState, toParams) {
				scope.navigation.state = toParams;
			}

			return whenStateChangeSuccess;
		}

		function updateNavigation (evt, data) {
			assign(data);
		}

		function updateRoute (scope, elm) {
			function whenUpdateRoute () {
				scope.navigation.route = route[_.toArray(params).length];
			}

			return whenUpdateRoute;
		}

		function trigger (scope, elm) {
			assign = assigning(scope, elm);

			assigning({sitemap: scope.sitemap});
			scope.$on('navigation', updateNavigation);
		}

		app
			.service('navigation_link',
				[
					'$rootScope', '$stateParams', '$timeout', 'routeProperty', 'config',
					function link (rootScope, stateParams, timeout, routeProperty, config) {
						route = _.rest(config.route.map.split('/:'));
						routeProp = routeProperty;
						root = rootScope;
						timer = timeout;
						params = stateParams;

						return trigger;
					}
				]
			)
			.directive('navigation',
				[
					'navigation_link',
					function directive (link) {
						return {
							restrict: 'AE',
							replace: true,
							templateUrl: 'partial/navigation.html',
							link : link
						};
					}
				]
			);
	}
)(kicl);
