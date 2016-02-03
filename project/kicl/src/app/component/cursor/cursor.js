(function cursor () {
	'use strict';

	var controller = [
		'$scope',
		'$window',
		'$element',
		'$attrs',
		'checkmobilebrowser',
		'tween',
			function (scope, win, element, attrs, checkmobilebrowser, tween) {
				var _window = angular.element(win),
					whileMouseMove;

				function getElement () {
					var target = {};

					target.cursor = element;
					target.svg = element.children('svg');
					target.frame = target.svg.children('.frame');
					target.arrow = target.svg.children('.arrow');

					return target;
				}

				function pause () {
					scope.cursor.status.pause = true;
				}

				function unpause () {
					delete scope.cursor.status.pause;
				}

				function whenMouseMove (event) {
					var target = {
						cursor : element
					};

					if (whileMouseMove) {
						whileMouseMove(getElement(), event);
					}

					if (scope.cursor.status.pause) {
						return;
					}

					tween.set(element, {
						x : event.pageX + element.parent().scrollLeft(),
						y : event.pageY + element.parent().scrollTop()
					});
				}

				function assignMouseMove (event, onMouseMove) {
					whileMouseMove = onMouseMove;
				}

				function whenResize () {
					if (checkmobilebrowser()) {
						angular.element(document).unbind('mousemove touchmove');
					}

					angular.element(document).bind('mousemove touchmove', whenMouseMove);
				}

				function destroy () {
					angular.element(document).unbind('mousemove touchmove');
				}

				scope.cursor = {};
				scope.cursor.status = {};

				scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'cursor.mouseMove.assign', assignMouseMove);
				scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'cursor.pause', pause);
				scope.$on((attrs.emitFrom ? attrs.emitFrom + '.' : '') + 'cursor.unpause', unpause);
				scope.$on('$destroy', destroy);

				angular.element(win).bind('resize', whenResize);

				whenResize();
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
