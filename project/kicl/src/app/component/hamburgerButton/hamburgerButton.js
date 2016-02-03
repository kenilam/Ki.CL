(function hamburgerButton () {
	'use strict';

	var controller = [
		'$rootScope', '$scope', '$element', '$attrs',
			function (root, scope, element, attrs) {
				function open () {
					scope.hamburgerButton.status.closed = false;
				}

				function close () {
					scope.hamburgerButton.status.closed = true;
				}

				function emit () {
					root.$broadcast(
						(attrs.emitTo ? attrs.emitTo + '.' : '') + 'hamburgerButton.troggle',
						scope.hamburgerButton.status.closed ? 'close' : 'open'
					);
				}

				function click () {
					scope.hamburgerButton.status.closed = !scope.hamburgerButton.status.closed;

					emit();
				}

				function stateChangeSuccess () {
					close();
				}

				scope.hamburgerButton = {};
				
				scope.hamburgerButton.status = {};
				scope.hamburgerButton.status.closed = Boolean(attrs.closeOnDefault === 'true');

				scope.hamburgerButton.control = {};
				scope.hamburgerButton.control.click = click;

				scope.$on('$stateChangeSuccess', stateChangeSuccess);

				scope.$on((attrs.emitTo ? attrs.emitFrom + '.' : '') + 'hamburgerButton.open', open);
				scope.$on((attrs.emitTo ? attrs.emitFrom + '.' : '') + 'hamburgerButton.close', close);

				emit();
			}
		];

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/hamburgerButton/hamburgerButton.html',
			controller : controller
		};
	}

	angular.module('component.hamburgerButton', [])
		.directive('hamburgerButton', [
			directive
		]);
}());
