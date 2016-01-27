(function cursor () {
	'use strict';

	var controller = [
		'$scope',
		'$element',
		'$attrs',
		'tween',
			function (scope, element, attrs, tween) {
				var whileMouseMove;

				function whenMouseMove (event) {
					tween.set(element, {
						x : event.pageX,
						y : event.pageY
					});

					if (whileMouseMove) {
						whileMouseMove(event);
					}
				}

				function assignMouseMove (event, onMouseMove) {
					whileMouseMove = onMouseMove;
				}

				function destroy () {
					angular.element(document).unbind('mousemove');
				}

				scope.cursor = {};

				scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'cursor.assign.mouseMove', assignMouseMove);
				scope.$on('$destroy', destroy);

				angular.element(document).bind('mousemove', whenMouseMove);
			}
		];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/cursor/cursor.html',
			controller : controller
		};
	}

	angular.module('component.cursor', [])
		.directive('cursor', [
			directive
		]);
}());
