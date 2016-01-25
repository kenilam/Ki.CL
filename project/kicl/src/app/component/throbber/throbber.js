(function throbber () {
	'use strict';

	var controller = [
		'$scope',
		'$attrs',
		function controller (scope, attrs) {
			function show () {
				scope.throbber.show = true;
			}

			function hide () {
				delete scope.throbber.show;
			}

			scope.throbber = {};
			scope.throbber.show = Boolean(attrs.showOnDefault === 'true');

			scope.$on(attrs.emitFrom + '.throbber.show', show);
			scope.$on(attrs.emitFrom + '.throbber.hide', hide);
		}
	];

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : true,
			templateUrl : 'app/component/throbber/throbber.html',
			controller : controller
		};
	}

	angular.module('component.throbber', [])
		.directive('throbber', [
			directive
		]);
}());
