(function navigation () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$element', '$attrs', '$timeout', '$state', 'sitemap',
			function (root, scope, elm, attrs, timeout, state, sitemap) {
				var index = 0;

				function setCurrent (index, list) {
					scope.navigation.current = list;

					if (index >= 0) {
						scope.navigation.current.index = index;
					}
				}

				function checkEachList (list) {
					if (list.route === state.current.name + '()') {
						setCurrent(index, list);
					}

					index = index + 1;
				}

				function checkList () {
					_.each(scope.navigation.list, checkEachList);
					
					index = 0;
				}

				function init () {
					checkList();
				}

				scope.navigation = {};
				
				scope.navigation.list = sitemap.get(attrs.list);
				
				root.$on('$stateChangeSuccess', checkList);

				timeout(init, 0);
			}
		];

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/navigation/navigation.html',
			controller : controller
		};
	}

	angular.module('component.navigation', [])
		.directive('navigation', [
			directive
		]);
}());
